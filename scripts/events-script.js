//http-server --cors

let events = []; // Declare the events array globally
let cardsContainer; // Declare cardsContainer globally

// Execute code when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    cardsContainer = document.getElementById('cards');
    const searchInput = document.getElementById('searchInput');

    // Fetch event data from the local JSON file
    fetch("http://localhost:3000/events")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(eventsData => {
            events = eventsData; // Update the global events variable
            renderEvents(events);

            // Event listener for the search input to filter events
            searchInput.addEventListener('input', function (event) {
                const searchTerm = event.target.value.toLowerCase();
                const filteredEvents = filterEvents(events, searchTerm);
                renderEvents(filteredEvents);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Function to filter events based on search term
function filterEvents(eventsToFilter, searchTerm) {
    return eventsToFilter.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.job_name.toLowerCase().includes(searchTerm) ||
        event.company_name.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.requirements.join(' ').toLowerCase().includes(searchTerm) ||
        event.deadline.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
    );
}

// Function to render event cards based on the provided array of events
function renderEvents(eventsToRender) {
    const data = eventsToRender.map(event => `
        <div class="card">
            <h1 class="title">${event.title}</h1>
            <p class="job-name">${event.job_name} at ${event.company_name}</p>
            <p class="description">${event.description}</p>
            <p class="requirements"><strong>Requirements:</strong> ${event.requirements.join(', ')}</p>
            <p class="deadline"><strong>Deadline:</strong> ${event.deadline}</p>
            <p class="dates"><strong>Dates:</strong> ${event.start_date} to ${event.end_date}</p>
            <p class="location"><strong>Location:</strong> ${event.location}</p>
        </div>`
    ).join('');

    cardsContainer.innerHTML = data;
}
