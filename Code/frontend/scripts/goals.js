// main.js
async function saveFitnessGoals() {
  const fitnessGoal = document.getElementById("fitnessGoal").value;
  const fitnessLevel = document.getElementById("fitnessLevel").value;
  const availableTime = document.getElementById("availableTime").value;

  const goalsData = {
    fitnessGoal,
    fitnessLevel,
    availableTime
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
  });
}

document.getElementById("fitnessGoalsForm").addEventListener("submit", function(event) {
  event.preventDefault();
  saveFitnessGoals();
});

async function loadGoals() {

    const response = await fetch('/api/user/goals'); 
    const goals = await response.json();


  const goalsListElement = document.getElementById('goalsList');
  goalsListElement.innerHTML = ''; 

  goals.forEach(goal => {
    const goalElement = document.createElement('div');
    goalElement.innerText = goal.goal;
    
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Erledigt';
    completeButton.addEventListener('click', () => completeGoal(goal.id));

    goalElement.appendChild(completeButton);
    goalsListElement.appendChild(goalElement);
  });
}


async function completeGoal(goalId) {
  await fetch(`/api/user/goals/${goalId}/complete`, {
     method: 'POST',
   });

  console.log(`Ziel ${goalId} als erledigt markiert.`);
  
  loadGoals();
}


loadGoals();