let signInButton = document.querySelector(".signInBtn");
let logInButton = document.querySelector(".logInBtn");
let userNameIn = document.querySelector(".userNameIn");
let logOutBtn = document.querySelector(".logOutBtn");
let cartElement = document.querySelector(".cart");
let favProducts = document.querySelector(".favProducts");

let firstName = localStorage.getItem("FirstName");
let lastName = localStorage.getItem("LastName");

function checkUserStatus() {
  if (firstName) {
    userNameIn.textContent = `Welcome, ${firstName.toLocaleUpperCase()} ${lastName.toLocaleUpperCase()}`; // Display user name
    signInButton.classList.add("d-none");
    logInButton.classList.add("d-none");
    logOutBtn.classList.remove("d-none");
    cartElement.classList.remove("d-none");
    favProducts.classList.remove("d-none");
  } else {
    userNameIn.textContent = "";
    signInButton.classList.remove("d-none");
    logInButton.classList.remove("d-none");
    logOutBtn.classList.add("d-none");
    cartElement.classList.add("d-none");
    favProducts.classList.add("d-none");
  }
}

checkUserStatus();

function handleUserLogout() {
  localStorage.clear();
  window.location = "SignUp.html";
}

logOutBtn.onclick = handleUserLogout;



let deleteAllBtn = document.querySelector("#deleteAllBtn");
function deleteAll() {
  localStorage.removeItem("products");
}

deleteAllBtn.onclick = function () {
  productsCart.innerHTML = "";
  deleteAll();
  cartCount();
  cartRead()
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



