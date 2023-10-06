import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyAweFz9xiYWgWTFXGEyDyOe9xVCm5yXgK8",
  authDomain: "online-auction-system-1b094.firebaseapp.com",
  projectId: "online-auction-system-1b094",
  storageBucket: "online-auction-system-1b094.appspot.com",
  messagingSenderId: "234078592591",
  appId: "1:234078592591:web:7a6832754ac56377ad543a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("searchQuery");

// Function to filter products based on the search query
function filterProductsBySearchQuery(searchQuery) {
  const filteredProducts = {};
 
  for (const productId in products) {
    const product = products[productId];
    if (product.productname.toLowerCase().includes(searchQuery.toLowerCase())) {
      filteredProducts[productId] = product;
    }
  }
  return filteredProducts;
}

// Display matching products on the page
async function displayMatchingProducts() {

  console.log("products :")
  console.log(products)
  console.log("query")

  // const searchResultsContainer = document.getElementById("searchInput");
  const filteredProducts = filterProductsBySearchQuery(searchQuery);
  console.log("filltered")
  console.log(filteredProducts)
    const productGrid = document.getElementById("product-grid");
    for (const productId in filteredProducts){
      console.log(productId)
      const product = filteredProducts[productId];
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      const productName = document.createElement("h3");
      productName.textContent = product.productname;
      productName.classList.add("product-heading");
  
      const productImage = document.createElement("img");
      productImage.src = product.imageurl;
  
      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;
      productDescription.classList.add("product-desc");
  
      const productPrice = document.createElement("p");
      productPrice.textContent = `Price: $${product.price}`;
      productPrice.classList.add("product-price");
  
      productCard.appendChild(productName);
      productCard.appendChild(productImage);
      productCard.appendChild(productDescription);
      productCard.appendChild(productPrice);
      productGrid.appendChild(productCard);
  
      // productCard.addEventListener("click", () => {
      //   // Redirect to another page and pass product details as parameters
      //   navigateToProductDetails(product);
      // });
    }
  
  }

var productsdb = ref(database, "products");

onValue(productsdb, (snapshot) => {
  const data = snapshot.val();
  products = data;
  console.log(data)
  displayMatchingProducts()
});

var products = {}





