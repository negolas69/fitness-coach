function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  const path = "path=/"; // Set the path to the root ("/")
  document.cookie = cname + "=" + cvalue + ";" + expires + ";" + path;
}

export function checkCookieSites() {
  const elNav = document.querySelector(".nav");
  const elLogin = document.querySelector("a[href='login.html']");
  const elRegister = document.querySelector("a[href='registration.html']");
  const elLogout = document.createElement("a");

  elLogout.textContent = "Logout";
  elLogout.classList.add("logout");

  elLogout.addEventListener("click", () => {
    setCookie("username", "", -1);
    window.location.href = "../index.html";
  });
  elNav.appendChild(elLogout);
  elLogin.innerHTML = "";
  elRegister.innerHTML = "";
}
export function checkCookieMain() {
  const elNav = document.querySelector(".nav");
  const elLogin = document.querySelector("a[href='sites/login.html']");
  const elRegister = document.querySelector(
    "a[href='sites/registration.html']"
  );
  const elLogout = document.createElement("a");

  elLogout.textContent = "Logout";
  elLogout.classList.add("logout");

  elLogout.addEventListener("click", () => {
    setCookie("username", "", -1);
    window.location.href = "index.html";
  });
  elNav.appendChild(elLogout);
  elLogin.innerHTML = "";
  elRegister.innerHTML = "";
}
