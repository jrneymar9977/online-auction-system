// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);

// Retrieve product details from query parameters
const productName = urlParams.get("productname");
const category = urlParams.get("category");
const description = urlParams.get("description");
const imageurl = urlParams.get("imageurl");
const baseprice = urlParams.get("baseprice");
const date = urlParams.get("date");
const starttime = urlParams.get("starttime");
const address = urlParams.get("address");

// Display product details on the page
document.getElementById("productName").textContent = productName;
document.getElementById("productCategory").textContent = category;
document.getElementById("productDescription").textContent = description;
document.getElementById("productImage").src = imageurl;
document.getElementById("productBasePrice").textContent = baseprice;
document.getElementById("productDate").textContent = date;
document.getElementById("productStartTime").textContent = starttime;
document.getElementById("productAddress").textContent = address;


  
  

  
  
  
