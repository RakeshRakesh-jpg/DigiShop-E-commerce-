let EmailInput = document.querySelector("#inputEmail");


let passwordInput = document.querySelector("#inputPassword");


let submit = document.querySelector("#submit"); 

let firstName = localStorage.getItem("FirstName");


let lastName = localStorage.getItem("LastName");


let password = localStorage.getItem("Password");
let Email = localStorage.getItem("Email");

function handleUserLogin(e) {
  e.preventDefault();
  if (
    EmailInput.value.toLowerCase() === Email &&
    passwordInput.value === password
  ) {
    window.location = "index.html";
  } else if (
    EmailInput.value.toLowerCase() !== Email ||
    passwordInput.value !== password
  ) {
    alert(
      "The email or password you entered is incorrect. Please check and try again."
    );
  } else if (EmailInput.value.toLowerCase() !== Email) {
    alert(
      "The email you entered does not match our records. Please check and try again."
    );
  } else if (passwordInput.value !== password) {
    alert(
      "The password you entered is incorrect. Please double-check your password and try again."
    );
  }
}

submit.addEventListener("click", handleUserLogin);

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
