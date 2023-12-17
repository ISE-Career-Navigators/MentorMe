//http-server --cors

let events = [];
let jobs = [];
let cardsContainerEvents;
let cardsContainerJobs;


document.addEventListener('DOMContentLoaded', () => {
    cardsContainerEvents = document.getElementById('cards_events');
    const searchInputEvents = document.getElementById('searchInput');

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
            searchInputEvents.addEventListener('input', function (event) {
                const searchTerm = event.target.value.toLowerCase();
                const filteredEvents = filterEvents(events, searchTerm);
                renderEvents(filteredEvents);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    cardsContainerJobs = document.getElementById('cards_jobs');
    const searchInputJobs = document.getElementById('searchInput');

    fetch("http://localhost:3000/jobs")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jobsData => {
            jobs = jobsData;
            renderJobs(jobs);

            // Event listener for the search input to filter events
            searchInputJobs.addEventListener('input', function (job) {
                const searchTerm = job.target.value.toLowerCase();
                const filteredJobs = filteredJobs(jobs, searchTerm);
                renderJobs(filteredJobs);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const searchInputEvents = document.getElementById('searchInput');
searchInputEvents.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    let filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.company.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
    );
    renderEvents(filteredEvents);
});

const searchInputJobs = document.getElementById('searchInput');
searchInputJobs.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    let filteredJobs = events.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.job_name.toLowerCase().includes(searchTerm) ||
        job.company_name.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
    );
    renderJobs(filteredJobs);
});


function filterEvents(eventsToFilter, searchTerm) {
    return eventsToFilter.filter(event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.company.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.requirements.join(' ').toLowerCase().includes(searchTerm) ||
        event.deadline.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
    );
}

function filterJobs(jobsToFilter, searchTerm) {
    return jobsToFilter.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.job_name.toLowerCase().includes(searchTerm) ||
        job.company_name.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.requirements.join(' ').toLowerCase().includes(searchTerm) ||
        job.deadline.toLowerCase().includes(searchTerm)
    );
}

function renderEvents(eventsToRender) {
    const data = eventsToRender.map(event => `
        <div class="card">
        <h3 class="type">Event</h3>
            <h1 class="title">${event.title}</h1>
            <p class="company">${event.company} 
            <p class="description">${event.description}</p>
            <p class="deadline"><strong>Deadline:</strong> ${event.deadline}</p>
            <p class="location"><strong>Location:</strong> ${event.location}</p>
        </div>`
    ).join('');

    cardsContainerEvents.innerHTML = data;
}

function renderJobs(jobsToRender) {
    const data = jobsToRender.map(job => `
        <div class="card">
        <h3 class="type">Job</h3>
            <h1 class="title">${job.title}</h1>
            <p class="job-name">${job.job_name} at ${job.company_name}</p>
            <p class="description">${job.description}</p>
            <p class="requirements"><strong>Requirements:</strong> ${job.requirements.join(', ')}</p>
            <p class="deadline"><strong>Deadline:</strong> ${job.deadline}</p>
            <p class="dates"><strong>Dates:</strong> ${job.start_date} to ${job.end_date}</p>
        </div>`
    ).join('');

    cardsContainerJobs.innerHTML = data;
}