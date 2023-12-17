// Get the mentor ID from the URL
// const urlParams = new URLSearchParams(window.location.search);
// const userId = urlParams.get('userId');

document.addEventListener('DOMContentLoaded', () => {
    const mentorId = 1;
    fetchUserProfile(mentorId);

    document.getElementById('profile-form').addEventListener('submit', function (e) {
        e.preventDefault();
        updateUserProfile(mentorId);
    });
});

function fetchUserProfile(mentorId) {
    fetch(`http://localhost:3000/mentors/${mentorId}`)
        .then(response => response.json())
        .then(mentorData => {
            document.getElementById('mentor-image').src = mentorData.image;
            document.getElementById('welcome-message').innerHTML = `Welcome, ${mentorData.name}!`;
            document.getElementById('name').value = mentorData.name;
            document.getElementById('email').value = mentorData.email;
            document.getElementById('password').value = mentorData.password;
            document.getElementById('username').value = mentorData.username;
            document.getElementById('description').value = mentorData.description;
            document.getElementById('workplace').value = mentorData.workplace;
            document.getElementById('location').value = mentorData.location;
            document.getElementById('price').value = mentorData.price;
            document.getElementById('expertise').value = mentorData.expertise;
            document.getElementById('education').value = mentorData.education;
            document.getElementById('linkedin').value = mentorData.linkedin;
            document.getElementById('github').value = mentorData.github;
            document.getElementById('interests').value = mentorData.interests; // Assuming interests is an array
            document.getElementById('title').value = mentorData.title;
            document.getElementById('card-number').value = mentorData.card.number;
            document.getElementById('card-cvc').value = mentorData.card.cvc;
            document.getElementById('card-date').value = mentorData.card.expirationDate;

            // For the following fields, you might need to format the data appropriately
            formatSessions(mentorData.sessions);
        })
        .catch(error => console.error('Error:', error));
}

function updateUserProfile(userId) {
    const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        username: document.getElementById('username').value,
        description: document.getElementById('description').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        workplace: document.getElementById('workplace').value,
        location: document.getElementById('location').value,
        price: document.getElementById('price').value,
        expertise: document.getElementById('expertise').value,
        education: document.getElementById('education').value,
        interests: document.getElementById('interests').value,
        title: document.getElementById('title').value,
        card: {
            number: document.getElementById('card-number').value,
            cvc: document.getElementById('card-cvc').value,
            expirationDate: document.getElementById('card-date').value,
        },
        sessions: document.getElementById('sessions-previous').value,
    };

    fetch(`http://localhost:3000/mentors/${mentorId}`, {
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
    console.log("I am inside sessions");
    console.log(sessions);

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
  