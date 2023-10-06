  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
 
  Signup.addEventListener('click',(e)=>{
  
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  const auth = getAuth();
 createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
  const user = userCredential.user;
  set(ref(database, 'users/' + user.uid),{
      username: name,
      email: email
  })
  alert('user created');
  window.location = "../profilepage/profilepage.html";

  // ...
 })
 .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage);
  // ..
 });
 })
 
Login.addEventListener('click',(e)=>{
  var email = document.getElementById('email-login').value;
  var password = document.getElementById('pass-login').value;
  console.log(email)
 
 signInWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  const dt = new Date();
  update(ref(database, 'users/' + user.uid),{
      last_login: dt,
  })
  // alert('User loged in')
  window.location = "../homepage/homepage.html";
  // ...
 })
 .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
 });
 })
 
 const user = auth.currentUser
 onAuthStateChanged(auth, (user) => {
 if (user) {
  const uid = user.uid;
  // ...
 } else {
  // User is signed out
  // ...
 }
 });
 
//  Signout.addEventListener('click', (e)=>{
//   signOut(auth).then(() => {
 
//  alert('signed out')
//  }).catch((error) => {
 
//  const errorCode = error.code;
//   const errorMessage = error.message;
//   alert(errorMessage)
//  });
 
//  })
 
//  change_pass.addEventListener('click', (e)=>{
 
//  const user = auth.currentUser;
//  const newPassword = getASecureRandomPassword();
 
//  updatePassword(user, newPassword).then(() => {
//  // Update successful.
//  alert('password changed')
//  }).catch((error) => {
//  // An error ocurred
//  // ...
//  const errorCode = error.code;
//   const errorMessage = error.message;
//  alert('errorMessage')
//  });
//  })
 
