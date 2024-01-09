import { checkCookieSites } from "./checkLogin.js";

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

function addListener() {
  document.getElementById("chat-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const prompt = document.getElementById("prompt").value;
    fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("response").innerText = data.response;
        document.getElementById("response").classList.add("response");
      })
      .catch((err) => {
        console.error("Error:", err);
        document.getElementById("response").innerText = "An error occurred.";
      });
  });
}
window.onload = function () {
  const cookie = getCookie("username");
  if (cookie) {
    checkCookieSites();
    addListener();
  }
};
