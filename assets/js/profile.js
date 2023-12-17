// Get the mentor ID from the URL
// const urlParams = new URLSearchParams(window.location.search);
// const userId = urlParams.get('userId');

document.addEventListener('DOMContentLoaded', () => {
    const userId = 1;
    fetchUserProfile(userId);

    document.getElementById('profile-form').addEventListener('submit', function (e) {
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

            // Populate mentorship packages
            const packagesContainer = document.getElementById('m-packages');
            userData.mPackages.forEach(package => {
                const packageCard = createMentorshipPackageCard(package);
                packagesContainer.appendChild(packageCard);
            });

            // Populate attended events
            const eventsContainer = document.getElementById('events-attended');
            userData.eventsAttended.forEach(event => {
                const eventCard = createEventCard(event);
                eventsContainer.appendChild(eventCard);
            });
            
            // Populate saved jobs
            const jobsContainer = document.getElementById('saved-jobs');
            userData.savedJobs.forEach(job => {
                const jobCard = createJobCard(job);
                jobsContainer.appendChild(jobCard);
            });
        })
        .catch(error => console.error('Error:', error));
}

function updateUserProfile(userId) {
    const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        username: document.getElementById('username').value,
        about: document.getElementById('about').value,
        interests: document.getElementById('interests').value.split(","),
        occupation: document.getElementById('occupation').value,
        card: {
            number: document.getElementById('card-number').value,
            cvc: document.getElementById('card-cvc').value,
            expirationDate: document.getElementById('card-date').value,
        },
        sessions: document.getElementById('sessions-previous').value,
        mPackages: document.getElementById('m-packages').value,
        eventsAttended: document.getElementById('events-attended').value,
        savedJobs: document.getElementById('saved-jobs').value
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

        const titleEl = document.createElement('h4');
        titleEl.innerHTML = session.title;

        const date = document.createElement('h4');
        date.textContent = `Date: ${session.date}`;

        const sessionsDiv = document.getElementById('sessions-previous');
        sessionsDiv.appendChild(sessionDiv);
        sessionDiv.appendChild(titleEl);
        sessionDiv.appendChild(date);
    })
}

function createMentorshipPackageCard(package) {
    const card = document.createElement('div');
    card.className = 'mentorship-package-card';

    const title = document.createElement('h4');
    title.className = 'package-title';
    title.textContent = `Package ID: ${package.packageId}`;

    // For linking to the mentor info page
    const mentorLink = document.createElement('a');
    mentorLink.src = "./mentor-info.html";
    mentorLink.target = "_blank";
    const mentorDiv = document.createElement('h4');
    mentorDiv.className = 'package-mentor';

    const mentorId = package.mentorId;
    console.log(mentorId);
    let mentorName = "";
    fetch(`http://localhost:3000/mentors/${mentorId}`)
    .then(response => response.json())
    .then(mentorData => {
        mentorName = mentorData.name;
        mentorDiv.innerHTML = `Mentor: <button id="mentor-button">${mentorName}</button>`;
        // Add an event listener to the product div
        mentorDiv.addEventListener('click', () => {
            // Set the new URL when the mentor is clicked
            window.open(`./mentor-info.html?mentorId=${package.mentorId}`, '_blank');
        });
    });

    const details = document.createElement('h4');
    details.className = 'package-details';
    details.innerHTML = `<a href=${package.resourceLink} target="_blank">Resource Link</a>`;

    const price = document.createElement('h4');
    price.className = 'package-price';
    price.textContent = `Price: $${package.price}`;

    card.appendChild(title);
    card.appendChild(details);
    card.appendChild(price);
    card.appendChild(mentorLink);
    mentorLink.appendChild(mentorDiv);
    card.appendChild(details);
    card.appendChild(price);

    return card;
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'events-attended-card';

    const title = document.createElement('h4');
    title.className = 'event-id';
    title.textContent = `Event ID: ${event.eventId}`;

    const description = document.createElement('h4');
    description.className = 'event-title';
    description.textContent = event.title;

    card.appendChild(title);
    card.appendChild(description);

    return card;
}

function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'saved-jobs-card';

    const title = document.createElement('h4');
    title.className = 'job-id';
    title.textContent = `Job ID: ${job.jobId}`;

    const description = document.createElement('h4');
    description.className = 'job-title';
    description.textContent = job.title;

    card.appendChild(title);
    card.appendChild(description);

    return card;
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
  