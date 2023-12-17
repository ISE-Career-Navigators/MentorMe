//http-server --cors
//npx json-server --watch mentors.json

let mentors = []; // Declare the mentors array globally
let cardsContainer; // Declare cardsContainer globally

// Execute code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    cardsContainer = document.getElementById('cards');
    const searchInput = document.getElementById('searchInput');

    // Fetch mentor data from the local JSON file
    fetch("http://localhost:3000/mentors")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(mentorsData => {
            mentors = mentorsData; // Update the global mentors variable
            renderMentors(mentors);

            console.log(mentors);
            const uniqueWorkplaces = []
            mentors.forEach(mentor => uniqueWorkplaces.push(mentor.workplace));
            console.log(uniqueWorkplaces);

            // Populate the dropdown with options
            const categorySelect = document.getElementById('categorySelect');
            uniqueWorkplaces.forEach(workplace => {
                const option = document.createElement('option');
                option.value = workplace.toLowerCase();
                option.textContent = workplace;
                categorySelect.appendChild(option);
            });

            // Event listener for the category select to filter mentors
            categorySelect.addEventListener('change', function () {
                const selectedCategory = categorySelect.value;
                const searchTerm = searchInput.value.toLowerCase();
                const filteredMentors = filterMentorsDifferent(mentors, searchTerm, selectedCategory);
                renderMentors(filteredMentors);
            });

            // Event listener for the search input to filter mentors
            searchInput.addEventListener('input', function (event) {
                const searchTerm = event.target.value.toLowerCase();
                const filteredMentors = filterMentors(mentors, searchTerm);
                renderMentors(filteredMentors);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

});

// Update the renderMentors function
function renderMentors(mentorsToRender) {
    const data = mentorsToRender.map((mentor) => {
        return `
        <div class="card" onclick="openMentorDetailPage(${mentor.id})">
            <h1 class="title">${mentor.name}</h1>
            <img src="${mentor.image}" alt="${mentor.name}" class="images">
            <p class="title">${mentor.title}</p>
            <div class="mentor-details">
                <div class="details-line">
                    <div class="detail">
                        <i class="fa-solid fa-briefcase"></i>
                        <h3 class="detail-label"></h3>
                        <p class="detail-value">${mentor.workplace}</p>
                    </div>
                    <div class="detail">
                        <i class="fa-solid fa-location-dot"></i>
                        <h3 class="detail-label"></h3>
                        <p class="detail-value">${mentor.location}</p>
                    </div>
                </div>
            </div>
            ${mentor.description ? `<p class="description">${mentor.description}</p>` : ''}
            <div class="details-line">
                    <div class="detail" id="price">
                        <i class="fa-solid fa-money-bill-wave"></i>
                        <h3 class="detail-label"></h3>
                        <p class="detail-value">${mentor.price}</p>
                    </div>
                </div>
            <p class="links">
                <a href="${mentor.linkedin}" target="_blank">LinkedIn</a> |
                <a href="${mentor.github}" target="_blank">GitHub</a> |
                <a href="mentor-info.html?mentorId=${mentor.id}" class="see-more">See More</a> <!-- Updated See More link -->
            </p>
        </div>`;
    }).join('');

    cardsContainer.innerHTML = data;
}

// Function to open the mentor detail page for a given mentorId
function openMentorDetailPage(mentorId) {
    window.location.href = `mentor-info.html?mentorId=${mentorId}`;
}

// Get reference to the search input and search button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// // Event listener for the search button to perform search
// searchButton.addEventListener('click', function () {
//     performSearch();
// });

// Event listener for the search input to filter mentors
searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    let filteredMentors = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.title.toLowerCase().includes(searchTerm) ||
        mentor.description.toLowerCase().includes(searchTerm)
    );
    renderMentors(filteredMentors);
});

// // Function to perform search
// function performSearch() {
//     const searchTerm = searchInput.value.toLowerCase();
//     let filteredMentors = mentors.filter(mentor =>
//         mentor.name.toLowerCase().includes(searchTerm) ||
//         mentor.title.toLowerCase().includes(searchTerm) ||
//         mentor.description.toLowerCase().includes(searchTerm)
//     );
//     renderMentors(filteredMentors);
// }


function filterMentorsDifferent(mentorsToFilter, searchTerm, selectedCategory) {
    return mentorsToFilter.filter(mentor =>
        (selectedCategory === 'all' || mentor.workplace.toLowerCase() === selectedCategory) &&
        (mentor.name.toLowerCase().includes(searchTerm) ||
            mentor.title.toLowerCase().includes(searchTerm) ||
            mentor.description.toLowerCase().includes(searchTerm)
        )
    );
}

document.addEventListener("DOMContentLoaded", function () {
    var dropdownBtn = document.querySelector(".dropdown-toggle");
    var dropdownMenu = document.querySelector(".dropdown-menu");
  
    dropdownBtn.addEventListener("click", function () {
      console.log("Dropdown button clicked");
      dropdownMenu.classList.toggle("active");
    });
  
    window.addEventListener("click", function (event) {
      if (!event.target.matches(".dropdown-toggle")) {
        if (dropdownMenu.classList.contains("active")) {
          console.log("Clicked outside dropdown; closing dropdown");
          dropdownMenu.classList.remove("active");
        }
      }
    });
  });
  