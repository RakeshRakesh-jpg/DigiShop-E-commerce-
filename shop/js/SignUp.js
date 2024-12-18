let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let Email = document.querySelector("#Email");
let password = document.querySelector("#inputPassword4");
let gridCheck = document.querySelector("#gridCheck");
let submit = document.querySelector("#submit");


function registerUser(e) {
  e.preventDefault();
  if (
    Email.value == "" ||
    firstName.value == "" ||
    lastName.value == "" ||
    password.value == ""
  ) {
    alert("Please fill in all required fields before proceeding.");
  } else if (Email.value.length < 5) {
    alert(
      "Email must be at least 5 characters long. Please enter a valid email address."
    );
  } else if (password.value.length < 5) {
    alert(
      "Password must be at least 5 characters long. Please enter a valid password."
    );
  } else {
    localStorage.setItem("FirstName", firstName.value);
    localStorage.setItem("LastName", lastName.value);
    localStorage.setItem("Email", Email.value);
    localStorage.setItem("Password", password.value);

    setTimeout(() => {
      window.location = "Login.html";
    }, 1000);
  }
}

submit.addEventListener("click", registerUser);

let FirstName = localStorage.getItem("FirstName");
let LastName = localStorage.getItem("LastName");

// Get elements from the DOM
let signInButton = document.querySelector(".signInBtn");
let logInButton = document.querySelector(".logInBtn");
let userNameIn = document.querySelector(".userNameIn");
let logOutBtn = document.querySelector(".logOutBtn");
let cartElement = document.querySelector(".cart"); // Cart element to hide when no user
let favProducts = document.querySelector(".favProducts");

// Retrieve user information from localStorage


// Function to check user status and update the UI accordingly
function checkUserStatus() {
  if (FirstName) {
    // User is logged in
    userNameIn.textContent = `Welcome, ${FirstName} ${LastName}`; // Display user name
    signInButton.classList.add("d-none"); // Hide sign in button
    logInButton.classList.add("d-none"); // Hide login button
    logOutBtn.classList.remove("d-none"); // Show logout button
    cartElement.classList.remove("d-none"); // Show cart element
    favProducts.classList.remove("d-none"); // Show cart element
  } else {
    // User is not logged in
    userNameIn.textContent = ""; // Clear user name display
    signInButton.classList.remove("d-none"); // Show sign in button
    logInButton.classList.remove("d-none"); // Show login button
    logOutBtn.classList.add("d-none"); // Hide logout button
    cartElement.classList.add("d-none"); // Hide cart element
    favProducts.classList.add("d-none"); // Hide cart element
  }
}

// Initial check on page load
checkUserStatus();
