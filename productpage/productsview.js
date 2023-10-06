import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const auth = getAuth();

console.log("products")
var productsdb = ref(database, "products");
function displayProducts() {
  const productGrid = document.getElementById("product-grid");
  for (const productId in products) {
    console.log(productId)
    const product = products[productId];
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productName = document.createElement("h3");
    productName.textContent = product.productname;
    productName.classList.add("product-heading");

    const productImage = document.createElement("img");
    productImage.src = product.imageurl;
    productImage.classList.add("product-image");

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

    productCard.addEventListener("click", () => {
      // Redirect to another page and pass product details as parameters
      navigateToProductDetails(product);
    });
  }

  

}
onValue(productsdb, (snapshot) => {
  const data = snapshot.val();
  products = data;
  console.log(data)
  displayProducts();
  window.addEventListener("load", displayProducts);
});
var products = {}
// ...

function navigateToProductDetails(product) {
  // Construct the URL for the product details page and encode the product details as query parameters
  const productDetailsUrl = `product-details.html?productname=${encodeURIComponent(product.productname)}&category=${encodeURIComponent(product.category)}&description=${encodeURIComponent(product.description)}&imageurl=${encodeURIComponent(product.imageurl)}&baseprice=${encodeURIComponent(product.baseprice)}&date=${encodeURIComponent(product.date)}&starttime=${encodeURIComponent(product.starttime)}&address=${encodeURIComponent(product.address)}`;

  // Redirect to the product details page
  window.location.href = productDetailsUrl;
}



// const loginLink = document.getElementById('login-text');
// const profileLink = document.getElementById('user-profile');
const Signout = document.getElementById('signout-btn');
Signout.addEventListener('click', (e)=>{
  signOut(auth).then(() => {
 
 alert('signed out')
 window.location = "/loginpage"
 }).catch((error) => {
 
 const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
 });
 
 })

 const searchButton = document.getElementById("searchButton");

 // Add a click event listener to the search button
 searchButton.addEventListener("click", () => {
   // Get the user's search query from the input field
   searchProuct();
 });
 
 function searchProuct()
 {
     const searchQuery = document.getElementById("searchInput").value;
 
   // Encode the search query for passing it as a URL parameter
   const encodedSearchQuery = encodeURIComponent(searchQuery);
 
   // Construct the URL for the search results page with the encoded search query
   const searchResultsUrl = `search.html?searchQuery=${encodedSearchQuery}`;
 
   // Redirect to the search results page
   window.location.href = searchResultsUrl;
 }
 
 const searchbar = document.getElementById("searchInput")
 
 searchbar.addEventListener("keydown",searchUser);
 function searchUser(event){
   if(event.key == 'Enter'){
     searchProuct()
   }
 }









