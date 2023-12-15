//http-server --cors

const jsonFilePath = 'http://localhost:8080/mentors.json';
let mentors = []; // Declare the mentors array globally
let cardsContainer; // Declare cardsContainer globally

// Execute code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    cardsContainer = document.getElementById('cards');
    const searchInput = document.getElementById('searchInput');

    // Fetch mentor data from the local JSON file
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(mentorsData => {
            mentors = mentorsData.mentors; // Update the global mentors variable
            renderMentors(mentors);

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

// Function to filter mentors based on search term
function filterMentors(mentorsToFilter, searchTerm) {
    return mentorsToFilter.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm) ||
        mentor.title.toLowerCase().includes(searchTerm) ||
        mentor.description.toLowerCase().includes(searchTerm)
    );
}

// Function to render mentor cards based on the provided array of mentors
function renderMentors(mentorsToRender) {
    const data = mentorsToRender.map(mentor => `
        <div class="card" onclick="openMentorDetailPage(${mentor.id})">
            <h1 class="title">${mentor.name}</h1>
            <img src="${mentor.image}" alt="${mentor.name}" class="images">
            <p class="title">Title: ${mentor.title}</p>
            <p class="description">Description: ${mentor.description}</p>
            ${mentor.country ? `<p class="details">Country: ${mentor.country}</p>` : ''}
            ${mentor.company ? `<p class="details">Company: ${mentor.company}</p>` : ''}
            <p class="links">
                <a href="${mentor.linkedin}" target="_blank">LinkedIn</a> |
                <a href="${mentor.github}" target="_blank">GitHub</a>
            </p>
        </div>`
    ).join('');

    cardsContainer.innerHTML = data;
}


// Function to open the mentor detail page for a given mentorId
function openMentorDetailPage(mentorId) {
    window.location.href = `mentor.html?id=${mentorId}`;
}

// Get reference to the search input and search button
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Event listener for the search button to perform search
searchButton.addEventListener('click', function () {
    performSearch();
});

// Event listener for the search input to filter mentors
searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredMentors = filterMentors(mentors, searchTerm);
    renderMentors(filteredMentors);
});

// Function to perform search
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredMentors = filterMentors(mentors, searchTerm);
    renderMentors(filteredMentors);
}
