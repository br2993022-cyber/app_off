// auth.js
import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async(e) => {
  e.preventDefault();

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  try {
    const login = await signInWithEmailAndPassword(auth, user, pass);
    alert("Inicio de sesión correcto ✔");
    window.location.href = "pantalla2.html";
  } catch(error) {
    alert("Error: " + error.message);
  }
});
