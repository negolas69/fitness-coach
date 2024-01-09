import { checkCookieMain } from "./checkLogin.js";

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

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.onload = function () {
  let username = getQueryParam("user");
  const cookie = getCookie("username");
  if (username) {
    setCookie("username", username, 30);
    checkCookieMain();
  } else if (cookie) {
    checkCookieMain();
  }
};
