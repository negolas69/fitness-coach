import { checkCookieSites } from "./checkLogin.js";

async function saveFitnessGoals() {
  const fitnessGoal = document.getElementById("fitnessGoal").value;
  const fitnessLevel = document.getElementById("fitnessLevel").value;
  const availableTime = document.getElementById("availableTime").value;

  const username = getCookie("username");

  const goalsData = {
    username,
    fitnessGoal,
    fitnessLevel,
    availableTime,
  };

  console.log(goalsData);

  await fetch("http://localhost:3001/api/user/saveGoals", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goalsData),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      loadGoals();
    });
}

document
  .getElementById("fitnessGoalsForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    saveFitnessGoals();
  });

async function loadGoals() {
  await fetch("/api/user/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: getCookie("username") }),
  })
    .then((res) => res.json())
    .then((goals) => {
      console.log(goals);
      const goalsListElement = document.getElementById("goalsList");
      goalsListElement.innerHTML = "";

      console.log(goals);

      goals.forEach((goal) => {
        const goalElement = document.createElement("div");
        const elTime = document.createElement("p");
        const elLevel = document.createElement("p");
        const elGoal = document.createElement("p");
        goalElement.classList.add("goal");
        elTime.innerText = "Verfügbare Zeit: " + goal.GoalTime;
        elLevel.innerText = "Level: " + goal.GoalLevel;
        elGoal.innerText = goal.GoalTarget;
        goalElement.appendChild(elGoal);
        goalElement.appendChild(elLevel);
        goalElement.appendChild(elTime);

        const completeButton = document.createElement("button");
        completeButton.innerText = "Erledigt";
        completeButton.addEventListener("click", () => completeGoal(goal.id));

        goalElement.appendChild(completeButton);
        goalsListElement.appendChild(goalElement);
      });
    });
}

async function completeGoal(goalId) {
  await fetch(`/api/user/goals/${goalId}/complete`, {
    method: "POST",
  });

  console.log(`Ziel ${goalId} als erledigt markiert.`);

  loadGoals();
}

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

window.onload = function () {
  const cookie = getCookie("username");
  if (cookie) {
    checkCookieSites();
    loadGoals();
  }
};
