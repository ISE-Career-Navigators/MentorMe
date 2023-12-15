// Get the mentor ID from the URL
// const urlParams = new URLSearchParams(window.location.search);
// const mentorId = urlParams.get('mentorId');

const mentorId = 1;

// Function to fetch mentor data
function loadMentorProfile(mentorId) {
    fetch(`http://localhost:3000/mentors/${mentorId}`)
        .then(response => response.json())
        .then(mentorData => {
            renderMentorProfile(mentorData);
        })
        .catch(error => console.error('Error fetching mentor data:', error));
}

// Function to render mentor profile
function renderMentorProfile(mentor) {
    document.getElementById('mentor-image').src = `assets/${mentor.image}`;
    document.getElementById('mentor-image').alt = mentor.name;
    document.getElementById('mentor-name').textContent = mentor.name;
    document.getElementById('mentor-title').textContent = mentor.title;
    document.getElementById('mentor-description').textContent = mentor.description;
    document.getElementById('mentor-linkedin').href = mentor.linkedin;
    document.getElementById('mentor-github').href = mentor.github;

    // Add event listener for booking appointment
    document.getElementById('book-appointment').addEventListener('click', () => {
        bookAppointment(mentor.id);
    });
}

// Function to handle booking an appointment
function bookAppointment(mentorId) {
    // Implement the logic for booking an appointment
    console.log(`Booking appointment with mentor ID: ${mentorId}`);
}

// Load the mentor profile
loadMentorProfile(mentorId);
