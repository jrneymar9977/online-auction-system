/* firebase Auth */

  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
// Initialize Firebase
// Make sure you have Firebase initialized with your config settings
// Get references to the navbar links
// const loginLink = document.getElementById('login-text');
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


console.log("products")
var productsdb = ref(database, "products");
onValue(productsdb, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  });

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 1000 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 1000);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

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
  const searchResultsUrl = `search-results.html?searchQuery=${encodedSearchQuery}`;

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
