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
    document.getElementById('mentor-occupation').textContent = mentor.title;

    function displayStarRating(container, rating) {
        const fullStar = '\u2605';  // Unicode character for a solid star
        const emptyStar = '\u2606'; // Unicode character for an outline star
        let stars = '';
    
        // Add full stars
        for (let i = 0; i < Math.floor(rating); i++) {
            stars += fullStar;
        }
    
        // Add half star if needed
        if (rating % 1 !== 0) {
            stars += '\u00BD' + emptyStar; // Unicode character for half star
        }
    
        // Add empty stars
        for (let i = Math.ceil(rating); i < 5; i++) {
            stars += emptyStar;
        }
    
        // Set the innerHTML of the container
        container.innerHTML = `<span class="star-rating">${stars}</span>`;
    }
    
    // Example usage
    const ratingDiv = document.getElementById("mentor-rating");
    displayStarRating(ratingDiv, mentor.rating);

    document.getElementById('mentor-workplace').textContent = mentor.workplace;
    document.getElementById('mentor-location').textContent = mentor.location;
    document.getElementById('mentor-about').textContent = mentor.description;
    document.getElementById('mentor-linkedin').href = mentor.linkedin;
    document.getElementById('mentor-github').href = mentor.github;
    document.getElementById('book-appointment').textContent = `Book for ${mentor.price}`;

    // Add event listener for booking appointment
    document.getElementById('book-appointment').addEventListener('click', () => {
        bookAppointment(mentor.id);
    });

    document.getElementById('mentor-expertise').textContent = mentor.expertise;
    document.getElementById('mentor-education').textContent = mentor.education;
    document.getElementById('mentor-interests').textContent = mentor.interests;
    // document.getElementById('mentor-feedbacks').textContent = mentor.feedbacks;

    document.addEventListener('DOMContentLoaded', () => {
        const slider = document.getElementById('review-slider');
        let scrollAmount = 0;
    
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
    
        nextBtn.addEventListener('click', () => {
            slider.scrollTo({
                top: 0,
                left: (scrollAmount += slider.offsetWidth),
                behavior: 'smooth'
            });
        });
    
        prevBtn.addEventListener('click', () => {
            slider.scrollTo({
                top: 0,
                left: (scrollAmount -= slider.offsetWidth),
                behavior: 'smooth'
            });
        });
    });    
}

// Function to handle booking an appointment
function bookAppointment(mentorId) {
    // Implement the logic for booking an appointment
    console.log(`Booking appointment with mentor ID: ${mentorId}`);
}

// Load the mentor profile
loadMentorProfile(mentorId);