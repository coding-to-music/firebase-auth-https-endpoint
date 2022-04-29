/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

// Initializes the Demo.
function Demo() {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      // Shortcuts to DOM Elements.
      this.signInButton = document.getElementById("demo-sign-in-button");
      this.signOutButton = document.getElementById("demo-sign-out-button");
      this.responseContainer = document.getElementById("demo-response");
      this.responseContainerCookie = document.getElementById(
        "demo-response-cookie"
      );
      this.urlContainer = document.getElementById("demo-url");
      this.urlContainerCookie = document.getElementById("demo-url-cookie");
      this.helloUserUrl = window.location.href + "hello";
      this.signedOutCard = document.getElementById("demo-signed-out-card");
      this.signedInCard = document.getElementById("demo-signed-in-card");

      // Bind events.
      this.signInButton.addEventListener("click", this.signIn.bind(this));
      this.signOutButton.addEventListener("click", this.signOut.bind(this));
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }.bind(this)
  );
}

// Triggered on Firebase auth state change.
Demo.prototype.onAuthStateChanged = function (user) {
  console.log("Demo.prototype.onAuthStateChanged");
  if (user) {
    this.urlContainer.textContent = this.helloUserUrl;
    this.urlContainerCookie.textContent = this.helloUserUrl;
    this.signedOutCard.style.display = "none";
    this.signedInCard.style.display = "block";
    this.startFunctionsRequest();
    this.startFunctionsCookieRequest();
  } else {
    this.signedOutCard.style.display = "block";
    this.signedInCard.style.display = "none";
  }
};

// Initiates the sign-in flow using GoogleAuthProvider sign in in a popup.
Demo.prototype.signIn = function () {
  console.log("Begin to call firebase.auth().signInWithPopup");
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  console.log("End   to call firebase.auth().signInWithPopup");
};

// Signs-out of Firebase.
Demo.prototype.signOut = function () {
  firebase.auth().signOut();
  // clear the __session cookie
  document.cookie = "__session=";
};

// Does an authenticated request to a Firebase Functions endpoint using an Authorization header.
Demo.prototype.startFunctionsRequest = function () {
  console.log("Demo.prototype.startFunctionsRequest");

  firebase
    .auth()
    .currentUser.getIdToken()
    .then(
      function (token) {
        console.log(
          "Sending request to",
          this.helloUserUrl,
          "with ID token in Authorization header."
        );
        var req = new XMLHttpRequest();
        req.onload = function () {
          this.responseContainer.innerText = req.responseText;
        }.bind(this);
        req.onerror = function () {
          this.responseContainer.innerText = "There was an error";
        }.bind(this);
        req.open("GET", this.helloUserUrl, true);
        req.setRequestHeader("Authorization", "Bearer " + token);
        req.send();
      }.bind(this)
    );
};

// Does an authenticated request to a Firebase Functions endpoint using a __session cookie.
Demo.prototype.startFunctionsCookieRequest = function () {
  console.log("Demo.prototype.startFunctionsCookieRequest");
  // Set the __session cookie.
  firebase
    .auth()
    .currentUser.getIdToken(true)
    .then(
      function (token) {
        // set the __session cookie
        document.cookie = "__session=" + token + ";max-age=3600";

        console.log(
          "Sending request to",
          this.helloUserUrl,
          "with ID token in __session cookie."
        );
        var req = new XMLHttpRequest();
        req.onload = function () {
          this.responseContainerCookie.innerText = req.responseText;
        }.bind(this);
        req.onerror = function () {
          this.responseContainerCookie.innerText = "There was an error";
        }.bind(this);
        req.open("GET", this.helloUserUrl, true);
        req.send();
      }.bind(this)
    );
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Load the demo.
window.demo = new Demo();
