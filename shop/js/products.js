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

function handleUserLogout() {
  localStorage.clear(); // Clear all local storage data
  window.location = "SignUp.html"; // Redirect to sign-up page
}

// Assign the logout function to the logout button click event
logOutBtn.onclick = handleUserLogout;

function GetData() {
  let Xml = new XMLHttpRequest();
  Xml.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let ApiData = JSON.parse(this.responseText);
      ShowData(ApiData.products);
    }
  };
  // 
  Xml.open("GET", "https://raw.githubusercontent.com/RakeshRakesh-jpg/fullstackDevelopment/9aef370a58b706d0b7babf7eb571d1033715ad43/products.json", true);
  Xml.send();
}
GetData();

let ProductsRow = document.querySelector(".Products-Row");
let AllProducts = [];

function ShowData(products) {
  AllProducts = products;
  let productHtml = "";

  products.forEach(function (product) {
    productHtml += `
        <div class='col-lg-4 col-md-3 col-12' data-aos="fade-up">
    <div class="card mx-auto my-3" style="width: 18rem;">
        <img src="${product.images[0]}" class="card-img-top" alt="${product.title}"> 
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text"><strong>Category: </strong>${product.category}</p>
            <p class="card-text"><strong>Available Stock:</strong> ${product.stock}</p>
            <p class="card-text"><strong>Price:</strong> $${product.price}</p>
            
            <div class="d-flex justify-content-between align-items-center">
                <a onclick="AddToCart(event, ${product.id}, AllProducts)" class="btn btn-primary">Buy Now</a>
                    <button onclick = addToFav(event,${product.id},AllProducts) class='btn btn-danger text-white'>
                    <i class="far fa-heart"></i> 
                    </button>
            </div>
        </div>
    </div>
</div>
        `;
  });

  ProductsRow.innerHTML = productHtml;
}


let searchBar = document.querySelector(".search-bar");
let categorySelect = document.querySelector(".form-select");
searchBar.addEventListener("input", () => Search(AllProducts));

function Search(AllProducts) {
  let searchBarValue = searchBar.value.toLowerCase();
  let selectedOption = categorySelect.value;
  if (selectedOption === "Choose a category") {
    alert("please chose category or name to search with.");
    ShowData(AllProducts);
    GetData();
  }
  let filteredProducts = AllProducts.filter((product) => {
    if (selectedOption === "Name") {
      return product.title.toLowerCase().includes(searchBarValue);
    } else if (selectedOption === "Category") {
      return product.category.toLowerCase().includes(searchBarValue);
    }
  });

  if (filteredProducts.length === 0) {
    ProductsRow.innerHTML = `<h3 class='text-danger'>No products found matching your search.</h3>`;
  } else {
    ShowData(filteredProducts);
  }
  if (searchBarValue === "") {
    ShowData(AllProducts);
    GetData();
  }
}

function AddToCart(event, id, AllProducts) {
  if (localStorage.getItem("FirstName")) {
    event.preventDefault();
    let chosenProduct = AllProducts.find((product) => product.id == id);
    let localProducts = JSON.parse(localStorage.getItem("products")) || [];
    localProducts.push(chosenProduct);
    localStorage.setItem("products", JSON.stringify(localProducts));
    cartRead();
  } else {
    let userConfirmed = confirm(
      "To proceed with your purchase, please sign up for an account first."
    );
    if (userConfirmed) {
      window.location = "SignUp.html";
    }
  }
}

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

let incNum = 0;

function inc(productId) {
  let proArr = JSON.parse(localStorage.getItem("products")) || [];
  let product = proArr.find((item) => item.id === productId);
  if (product) {
    product.stock = ++incNum;
    let quantityElement = document.querySelector(`#quantity-${productId}`);
    if (quantityElement) {
      quantityElement.innerHTML = incNum;
    }
    localStorage.setItem("products", JSON.stringify(proArr));
  }
}
function dec(productId) {
  let proArr = JSON.parse(localStorage.getItem("products")) || [];
  let product = proArr.find((item) => item.id === productId);
  if (product && incNum > 0) {
    product.stock = --incNum;
    let quantityElement = document.querySelector(`#quantity-${productId}`);
    if (quantityElement) {
      quantityElement.innerHTML = incNum;
    }
    localStorage.setItem("products", JSON.stringify(proArr));
  }
}

window.onload = function () {
  cartRead();
  cartCount();
};

let btnCenter = document.querySelector(".btn-center");

let roundedPill = document.querySelector(".rounded-pill");

function cartCount() {
  // Select all product elements in the cart
  let allProLength = document.querySelectorAll(".productsCart .col-lg-4");

  // Update the rounded pill with the count of products
  roundedPill.innerHTML = allProLength.length;

  // Toggle button visibility based on product count
  if (allProLength.length > 0) {
    btnCenter.classList.remove("d-none"); // Show the button if there are products
    btnCenter.classList.add("d-grid"); // Optionally add 'd-grid' class
  } else {
    btnCenter.classList.add("d-none"); // Hide the button if no products
    btnCenter.classList.remove("d-grid"); // Remove 'd-grid' class if needed
  }
}

// Initial count check on page load
cartCount();

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

function addToFav(event, id, AllProducts) {
  event.preventDefault();
  let chosenProduct = AllProducts.filter((product) => product.id == id);
  let favArr = JSON.parse(localStorage.getItem("favProduct")) || [];
  favArr.push(chosenProduct);
  localStorage.setItem("favProduct", JSON.stringify(favArr));
  AddToCart();
}

function deleteProduct(id) {
  let deletedPro = document.getElementById(id);
  if (deletedPro) {
    deletedPro.remove();
    cartCount();
  }
  cartCount();
}
