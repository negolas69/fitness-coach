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
      if (response.message === "Login successful") {
        window.location.href = "http://localhost:3001/index.html";
      }
    });
}

const elButton = document.getElementById("submit");
elButton.addEventListener("click", login);
