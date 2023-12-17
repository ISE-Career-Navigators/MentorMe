document.addEventListener("DOMContentLoaded", function () {
    // Function to populate dropdown options
    function populateDropdown(selectElement, optionsArray) {
        for (let i = 0; i < optionsArray.length; i++) {
            const option = document.createElement("option");
            option.value = optionsArray[i];
            option.text = optionsArray[i];
            selectElement.appendChild(option);
        }
    }

    // Populate month dropdown
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const selectMonth = document.getElementById("expMonth");
    populateDropdown(selectMonth, months);

    // Populate year dropdown
    const currentYear = new Date().getFullYear();
    const selectYear = document.getElementById("expYear");
    const yearOptions = [];
    for (let i = currentYear; i <= currentYear + 7; i++) {
        yearOptions.push(i);
    }
    populateDropdown(selectYear, yearOptions);
});

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
  