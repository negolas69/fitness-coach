function getCookie(name) {
  var cname = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  const path = "path=/"; // Set the path to the root ("/")
  document.cookie = cname + "=" + cvalue + ";" + expires + ";" + path;
  const cookiess = cname + "=" + cvalue + ";" + expires + ";" + path;
  console.log(cookiess);
  console.log(getCookie("username"));
}

function checkCookies() {
  getCookie("username");
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.onload = function () {
  let username = getQueryParam("user");
  const cookie = getCookie("username");
  if (username) {
    setCookie("username", username, 30);
    const elNav = document.querySelector(".nav");
    const elLogin = document.querySelector("a[href='sites/login.html']");
    const elRegister = document.querySelector(
      "a[href='sites/registration.html']"
    );
    const elLogout = document.createElement("a");
    elLogout.textContent = "Logout";
    elLogout.classList.add("logout");
    elNav.appendChild(elLogout);
    elLogout.addEventListener("click", () => {
      setCookie("username", "", -1);
      window.location.href = "index.html";
    });

    elLogin.innerHTML = "";
    elRegister.innerHTML = "";
  } else if (cookie) {
    const elNav = document.querySelector(".nav");
    console.log(elNav);
  }
};
