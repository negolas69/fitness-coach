async function login() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const data = {
    username: username.value,
    password: password.value,
  };

  console.log(data);

  await fetch("http://localhost:3001/api/user/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      const elP = document.getElementById("message");

      if (response.message === "Login successful") {
        window.location.href =
          "http://localhost:3001/index.html?user=" + data.username;
      } else if (response.message === "Wrong password") {
        elP.textContent = "Wrong password";
        elP.classList.add("error");
        elP.classList.remove("hidden");
        password.value = "";
        password.classList.add("error");
        alert("Wrong password");
      } else if (response.message === "User not found") {
        elP.textContent = "User not found";
        elP.classList.add("error");
        elP.classList.remove("hidden");
        password.value = "";
        password.classList.add("error");
        username.value = "";
        username.classList.add("error");
        alert("User not found");
      }
    });
}

const elButton = document.getElementById("submit");
elButton.addEventListener("click", login);
