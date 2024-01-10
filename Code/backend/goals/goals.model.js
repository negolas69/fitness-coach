import * as mysql from "mysql2";

const db = mysql.createConnection({
  user: "d03ed050",
  host: "w01cc2a0.kasserver.com",
  password: "F1tne55!",
  database: "d03ed050",
});

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

  async function removeUserGoal(goalId) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM TGoals WHERE id = ?";
      db.query(query, [goalId], (err, result) => {
        if (err) {
          console.error("Fehler beim Entfernen des Trainingsziels: ", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  }
  
  export { saveUserGoals, getUserGoals, removeUserGoal };