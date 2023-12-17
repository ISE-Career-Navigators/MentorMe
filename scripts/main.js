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
