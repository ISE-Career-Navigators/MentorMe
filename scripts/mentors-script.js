//http-server --cors

const jsonFilePath = 'http://localhost:3000/mentors';

// Execute code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const cardsContainer = document.getElementById('cards');

    // Fetch mentor data from the local JSON file
    fetch(jsonFilePath)
        .then(response => {
            // Check if the network response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(mentorsData => {
            console.log('Mentors Data:', mentorsData);
            const mentors = mentorsData; // Extract mentor data from the response

            // Function to render mentor cards based on the provided array of mentors
            function renderMentors(mentorsToRender) {
                // Check if mentorsToRender is an array
                if (Array.isArray(mentorsToRender)) {
                    const data = mentorsToRender.map(mentor => `
                    <div class="card" onclick="openMentorDetailPage(${mentor.id})">
                        <h1 class="title">${mentor.name}</h1>
                        <img src="assets/${mentor.image}" alt="${mentor.name}" class="images">
                        <p class="title">Title: ${mentor.title}</p>
                        <p class="description">Description: ${mentor.description}</p>
                        <p class="links">
                            <a href="${mentor.linkedin}" target="_blank">LinkedIn</a> |
                            <a href="${mentor.github}" target="_blank">GitHub</a>
                        </p>
                    </div>`
                    ).join('');

                    cardsContainer.innerHTML = data;
                } else {
                    console.error('Error: mentorsToRender is not an array', mentorsToRender);
                }
            }
            // Initial rendering of mentors
            renderMentors(mentors);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Function to open the mentor detail page for a given mentorId
function openMentorDetailPage(mentorId) {
    window.location.href = `mentor.html?id=${mentorId}`;
}

// Get reference to the search input
const searchInput = document.getElementById('searchInput');

// Event listener for the search input to filter mentors
searchInput.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredMentors = filterMentors(mentors, searchTerm);
    renderMentors(filteredMentors);
});


// Function to filter mentors based on search term
function filterMentors(mentorsToFilter, searchTerm) {
    return mentorsToFilter.mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm)
    );
}
