import * as mysql from "mysql2";

const db = mysql.createConnection({
  user: "d03ed050",
  host: "w01cc2a0.kasserver.com",
  password: "F1tne55!",
  database: "d03ed050",
});

async function getUser(username, email) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM TUsers WHERE username=? AND email=?;",
      [username, email],
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        }
        if (result.length == 0) {
          resolve([]);
        } else if (result.length > 0) {
          resolve(result);
        }
      }
    );
  });
}

async function createUser(
  username,
  firstname,
  lastname,
  email,
  password,
  password2
) {
  db.query(
    "INSERT INTO TUsers (username,firstname,lastname,email,password,password2) VALUES (?, ?, ?, ?, ?, ?)",
    [username, firstname, lastname, email, password, password2],
    (err) => {
      if (err) {
        console.log("user error", err);
      }
    }
  );
}

async function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM TUsers WHERE username=?;",
      [username],
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
        }
        if (result.length == 0) {
          resolve([]);
        } else if (result.length > 0) {
          resolve(result);
        }
      }
    );
  });
}

async function saveUserGoals(
  username,
  fitnessGoal,
  fitnessLevel,
  availableTime
) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO TGoals (GoalUsername, GoalTarget, GoalLevel, GoalTime) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [username, fitnessGoal, fitnessLevel, availableTime],
      (err, result) => {
        if (err) {
          console.error("Fehler beim Speichern der Trainingsziele: ", err);
          return reject(err);
        }
        resolve(result);
      }
    );
  });
}

async function getUserGoals(username) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM TGoals WHERE GoalUsername=?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

export { getUser, getUserByUsername, createUser, saveUserGoals, getUserGoals };
