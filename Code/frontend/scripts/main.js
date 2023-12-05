async function signUp() {
  const username = document.getElementById("username");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");

  const data = {
    username: username.value,
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
  };

  console.log(data);

  if (password.value != password2.value) {
    password.value = "";
    password2.value = "";
    password.classList.add("error");
    password2.classList.add("error");
    alert("Passwords do not match");
    return;
  } else {
    await fetch("http://localhost:3001/api/user/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message === "User created successfully") {
          window.location.href = "http://localhost:3001/sites/login.html";
        }
      });
  }
}

const elButton = document.getElementById("submit");
elButton.addEventListener("click", signUp);
