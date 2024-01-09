import {
  getUser,
  createUser,
  getUserByUsername,
  saveUserGoals,
  getUserGoals,
} from "./user.model.js";

async function create(req, res) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  const results = await getUser(username, email);

  console.log(results);

  if (results.length == 0) {
    const result = await createUser(
      username,
      firstname,
      lastname,
      email,
      password,
      password2
    );
    res.send({ message: "User created successfully" });
  }
}

async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const results = await getUserByUsername(username);

  console.log(results);

  if (results.length == 0) {
    res.send({ message: "User not found" });
  } else if (results.length > 0) {
    if (results[0].password == password) {
      res.send({ message: "Login successful" });
    } else {
      res.send({ message: "Wrong password" });
    }
  }
}

async function saveGoals(req, res) {
  const { username, fitnessGoal, fitnessLevel, availableTime } = req.body;
  try {
    const result = await saveUserGoals(
      username,
      fitnessGoal,
      fitnessLevel,
      availableTime
    );
    res.send({ message: "Trainingsziele erfolgreich gespeichert" });
  } catch (error) {
    res.status(500).send({
      message: "Fehler beim Speichern der Trainingsziele",
      error: error,
    });
  }
}

async function getGoals(req, res) {
  const username = req.body.username;
  console.log(username);
  try {
    const results = await getUserGoals(username);
    res.send(results);
  } catch (error) {
    res.status(500).send({
      message: "Fehler beim Abrufen der Trainingsziele",
      error: error,
    });
  }
}

export { create, login, saveGoals, getGoals };
