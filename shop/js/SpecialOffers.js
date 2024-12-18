// Get elements from the DOM
let signInButton = document.querySelector(".signInBtn");
let logInButton = document.querySelector(".logInBtn");
let userNameIn = document.querySelector(".userNameIn");
let logOutBtn = document.querySelector(".logOutBtn");
let cartElement = document.querySelector(".cart"); // Cart element to hide when no user
let favProducts = document.querySelector(".favProducts");
// Retrieve user information from localStorage
let firstName = localStorage.getItem("FirstName");
let lastName = localStorage.getItem("LastName");

// Function to check user status and update the UI accordingly
function checkUserStatus() {
  if (firstName) {
    // User is logged in
    userNameIn.textContent = `Welcome, ${firstName.toLocaleUpperCase()} ${lastName.toLocaleUpperCase()}`; // Display user name
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

function fetchProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://raw.githubusercontent.com/RakeshRakesh-jpg/fullstackDevelopment/refs/heads/main/offer.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);
      ShowData(products);
      console.log(products);
    } else {
      console.error("Error fetching products:", xhr.status);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send();
}

fetchProducts();

let ProductsRow = document.querySelector(".Products-Row");
let AllProducts = [];

function ShowData(products) {
  AllProducts = products;
  let productHtml = "";

  products.forEach(function (product) {
    productHtml += `
      <div class='col-lg-4 col-md-3 col-12'>
        <div class="card mx-auto my-3" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="${product.title}"> 
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text"><strong>Category: </strong>${product.category}</p>
            <p class="card-text" style="color: red;"><strong>Only ${product.rating.count} left!</strong></p>
            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
          </div>
        </div>
      </div>
    `;
  });

  ProductsRow.innerHTML = productHtml;
}

let deleteAllBtn = document.querySelector("#deleteAllBtn");
function deleteAll() {
  localStorage.removeItem("products");
}

deleteAllBtn.onclick = function () {
  productsCart.innerHTML = "";
  deleteAll();
  cartCount();
  cartRead();
};

let btnCenter = document.querySelector(".btn-center");
let roundedPill = document.querySelector(".rounded-pill");

function cartCount() {
  let allProLength = document.querySelectorAll(".productsCart .col-lg-4");
  roundedPill.innerHTML = allProLength.length;

  if (allProLength.length > 0) {
    btnCenter.classList.remove("d-none");
    btnCenter.classList.add("d-grid");
  } else {
    btnCenter.classList.add("d-none");
    btnCenter.classList.remove("d-grid");
  }
}

cartCount();

let productsCart = document.querySelector(".productsCart");

function cartRead() {
  let localProducts = JSON.parse(localStorage.getItem("products")) || [];
  let cartHtml = "";
  if (localProducts.length === 0) {
    productsCart.innerHTML = `<h4 class='text-danger'>Your cart is empty. Add products to continue.</h4>`;
  } else {
    localProducts.forEach(function (product) {
      cartHtml += `
      <div class='col-lg-4 col-md-3 col-12'>
        <div class="card mx-auto my-1" style="width: 18rem;">
          <div class="card-body" id="${product.id}">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text"><strong>Category: </strong>${product.category}</p>
            <p class="card-text"><strong>Available Stock:</strong> ${product.stock}</p>
            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
            <div class="d-grid gap-2 d-md-block">
              <button onclick="inc(${product.id})" class="btn btn-primary" type="button">+</button>
              <button onclick="dec(${product.id})" class="btn btn-primary" type="button">-</button>
            </div>
            <div>
              <p>Quantity</p>
              <span class='Quantity' id="quantity-${product.id}">0</span>
            </div>
            <button onclick="deleteProduct(${product.id})" class='btn btn-danger'>Delete Product</button>
          </div>
        </div>
      </div>
    `;
    });

    productsCart.innerHTML = cartHtml;
    cartCount();
  }
}
window.onload = function () {
  cartRead();
  cartCount();
};