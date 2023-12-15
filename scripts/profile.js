// Get the mentor ID from the URL
// const urlParams = new URLSearchParams(window.location.search);
// const userId = urlParams.get('userId');

document.addEventListener('DOMContentLoaded', () => {
    const userId = 1;
    fetchUserProfile(userId);

    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        updateUserProfile(userId);
    });
});

function fetchUserProfile(userId) {
    fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(userData => {
            document.getElementById('user-image').src = userData.image;
            document.getElementById('welcome-message').innerHTML = `Welcome, ${userData.name}!`;
            document.getElementById('name').value = userData.name;
            document.getElementById('email').value = userData.email;
            document.getElementById('password').value = userData.password;
            document.getElementById('username').value = userData.username;
            document.getElementById('about').value = userData.about;
            document.getElementById('interests').value = userData.interests.join(', '); // Assuming interests is an array
            document.getElementById('occupation').value = userData.occupation;
            document.getElementById('card-number').value = userData.card.number;
            document.getElementById('card-cvc').value = userData.card.cvc;
            document.getElementById('card-date').value = userData.card.expirationDate;

            // For the following fields, you might need to format the data appropriately
            formatSessions(userData.sessions);
            // document.getElementById('m-packages').innerHTML = formatMPackages(userData.mPackages);
            // document.getElementById('events-attended').innerHTML = formatEventsAttended(userData.eventsAttended);
            // document.getElementById('saved-jobs').innerHTML = formatSavedJobs(userData.savedJobs);
        })
        .catch(error => console.error('Error:', error));
}

function updateUserProfile(userId) {
    const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        // Retrieve other fields
    };

    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function formatSessions(sessions) {
    sessions.forEach((session) => {
        const sessionDiv = document.createElement('div');
        sessionDiv.id = "session-card";

        const titleEl = document.createElement('h2');
        titleEl.textContent = session.title;

        const startDateEl = document.createElement('h3');
        startDateEl.textContent = session.startDate;

        const endDateEl = document.createElement('h3');
        endDateEl.textContent = session.endDate;

        const sessionsDiv = document.getElementById('sessions-previous');
        sessionsDiv.appendChild(sessionDiv);
        sessionDiv.appendChild(titleEl);
        sessionDiv.appendChild(startDateEl);
        sessionDiv.appendChild(endDateEl);
    })
}