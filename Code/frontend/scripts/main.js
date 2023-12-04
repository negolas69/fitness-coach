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
  }
}
