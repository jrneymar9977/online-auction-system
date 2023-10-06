import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
        // JavaScript code to retrieve the category from the query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        document.title = `Category: ${category}`;

        // Firebase code to fetch products of the selected category
        const productsRef = ref(database, "products");
        onValue(productsRef, (snapshot) => {
            const products = snapshot.val();
            const productList = document.getElementById("productList");

            // Iterate through products and display products of the selected category
            for (const productId in products) {
                const product = products[productId];
                if (product.category === category) {
                    const productItem = document.createElement("div");
                    productItem.classList.add("product-item");
                    productItem.innerHTML = `
                        <h3>${product.productname}</h3>
                        <img src="${product.imageurl}" alt="${product.productname}">
                        <p>Description: ${product.description}</p>
                        <p>Base Price: $${product.baseprice}</p>
                        <p>Date: ${product.date}</p>
                        <p>Start Time: ${product.starttime}</p>
                    `;
                    productList.appendChild(productItem);
                }
            }
        });
