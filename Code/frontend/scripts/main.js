import axios from "axios";

function signUp() {
  const username = document.getElementById("username");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  if (password.value != password2.value) {
    password.value = "";
    password2.value = "";
    password.classList.add("error");
    password2.classList.add("error");
    alert("Passwords do not match");
    return;
  } else {
    axios
      .post("http://localhost:3001/api/user", {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        password2: password2,
      })
      .then((response) => {
        console.log("success");
        console.log(response);
      });
  }
}

const elButton = document.getElementById("submit");
elButton.addEventListener("click", signUp);
