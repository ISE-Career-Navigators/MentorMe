// Define the path to the local JSON file
const jsonFilePath = 'http://localhost:8080/mentors.json';

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
                // Check if mentorsToRender is an object with a mentors property
                if (mentorsToRender && Array.isArray(mentorsToRender.mentors)) {
                    const data = mentorsToRender.mentors.map(mentor => `
                        <div class="card" onclick="openMentorDetailPage(${mentor.id})">
                            <h1 class="title">${mentor.name}</h1>
                            <img src="${mentor.image}" alt="${mentor.name}" class="images">
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
                    console.error('Error: mentorsToRender is not an object with mentors array', mentorsToRender);
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
