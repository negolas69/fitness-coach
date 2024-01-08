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
