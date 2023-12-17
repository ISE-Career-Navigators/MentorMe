document.addEventListener("DOMContentLoaded", function () {
  var dropdownBtn = document.querySelector(".dropdown-toggle");
  var dropdownMenu = document.querySelector(".dropdown-menu");

  dropdownBtn.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the window click event from immediately closing the dropdown
      dropdownMenu.classList.toggle("active");
  });

  window.addEventListener("click", function () {
      if (dropdownMenu.classList.contains("active")) {
          dropdownMenu.classList.remove("active");
      }
  });
});
