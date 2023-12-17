document.addEventListener("DOMContentLoaded", function () {
    // Get the dropdown button
    var dropdownBtn = document.querySelector(".dropdown-toggle");

    // Get the dropdown menu
    var dropdownMenu = document.querySelector(".dropdown-menu");

    // Toggle the "active" class on click
    dropdownBtn.addEventListener("click", function () {
      dropdownMenu.classList.toggle("active");
    });

    // Close the dropdown menu if the user clicks outside of it
    window.addEventListener("click", function (event) {
      if (!event.target.matches(".dropdown-toggle")) {
        if (dropdownMenu.classList.contains("active")) {
          dropdownMenu.classList.remove("active");
        }
      }
    });
  });