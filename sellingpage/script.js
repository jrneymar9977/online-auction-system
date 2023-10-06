import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getStorage, ref as storeref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
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


// Get a reference to the input element
const floatInput = document.getElementById('float-input');

// Attach an input event listener to the input element
floatInput.addEventListener('input', function () {
    // Remove any non-numeric characters from the input value
    this.value = this.value.replace(/[^0-9.,]/g, '');

    // Ensure that there is only one decimal point
    const decimalCount = (this.value.match(/[.,]/g) || []).length;
    if (decimalCount > 1) {
        this.value = this.value.replace(/([.,])(?=[.,])/g, '');
    }
});

//To receive image file alone

const imageUpload = document.getElementById('image-upload');

// Attach a change event listener to the file input
imageUpload.addEventListener('change', function () {
    const selectedFile = this.files[0];

    // Check if a file was selected
    if (selectedFile) {
        // Get the file's MIME type
        const fileType = selectedFile.type;
        if (/^image\/(jpg|jpeg|png)$/.test(fileType)) {
            // It's an allowed image format, you can handle it here
            console.log('Selected file is an allowed image:', selectedFile.name);
        } else {
            // Not an allowed image format, display an error message or take appropriate action
            alert('Please select a JPG, JPEG, or PNG image file.');
            // Clear the file input
            this.value = null;
        }
    }
});


// const loginLink = document.getElementById('login-text');
// const profileLink = document.getElementById('user-profile');




const imageele = document.getElementById('image-upload'); // Assuming you have an image preview element with ID 'image-preview'
var imgdata = null;
imageele.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        imgdata = file

    }
});

// Add an event listener to the form submission
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect input values
    const category = document.getElementById('category').value;
    const productName = document.querySelector('input[placeholder="Product Name"]').value;
    const description = document.querySelector('input[placeholder="Description"]').value;
    const basePrice = document.getElementById('float-input').value;
    const date = document.querySelector('input[placeholder="Auction Duration"]').value;
    const startTime = document.querySelector('input[placeholder="Auction Duration"]').value;
    const endTime = document.querySelector('input[placeholder="Auction Duration"]').value;
    const address = document.querySelector('input[placeholder="Address"]').value;

    // Capture the image URL from the image preview (if needed)


    const productId = generateUniqueProductId();

    // Create a root reference
    const storage = getStorage();


    // Create a reference to 'images/mountains.jpg'
    var imagesRef = storeref(storage, `product_images/${productId}_${productName}.jpg`);
    uploadBytes(imagesRef, imgdata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot)

    });
    // console.log("image uploaded")
    // console.log(imgsnap)
    const response = await fetch(product.imageurl);
    const imgToken = await response.json();

    var imgurl = `https://firebasestorage.googleapis.com/v0/b/online-auction-system-1b094.appspot.com/o/product_images%2F${productId}_${productName}.jpg?alt=media&token=${imgToken.downloadTokens}`


    // Create a data object
    const productData = {
        productname: productName,
        category: category,
        description: description,
        imageurl: imgurl, // Use the captured image URL here
        baseprice: parseFloat(basePrice), // Convert basePrice to a floating-point number
        price: parseFloat(basePrice), // Set the initial price to the base price
        date: date,
        starttime: startTime,
        address: address,
    };

    // // Generate a unique product ID (you can use a library like UUID for this)

    // Reference to the products in the database
    const productsRef = ref(database, `products/${productId}`);

    // Use the set method to add the new product data to the database
    set(productsRef, productData)
        .then(() => {
            console.log('Product added to the database');
            alert('Item Listed')
            form.reset();
        })
        .catch((error) => {
            console.error('Error adding product to the database', error);
            // Handle the error, display an error message, etc.
        });
});

// Function to generate a unique product ID (you can use a library like UUID for this)
function generateUniqueProductId() {
    // Generate a unique ID logic here (e.g., UUID)
    // For simplicity, we'll use a timestamp for demonstration purposes
    return Date.now().toString();
}
const Signout = document.getElementById('signout-btn');
Signout.addEventListener('click', (e) => {
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

function searchProuct() {
    const searchQuery = document.getElementById("searchInput").value;

    // Encode the search query for passing it as a URL parameter
    const encodedSearchQuery = encodeURIComponent(searchQuery);

    // Construct the URL for the search results page with the encoded search query
    const searchResultsUrl = `search-res.html?searchQuery=${encodedSearchQuery}`;

    // Redirect to the search results page
    window.location.href = searchResultsUrl;
}

const searchbar = document.getElementById("searchInput")

searchbar.addEventListener("keydown", searchUser);
function searchUser(event) {
    if (event.key == 'Enter') {
        searchProuct()
    }
}