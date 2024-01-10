import {
    saveUserGoals,
    getUserGoals,
    removeUserGoal,
  } from "./goals.model.js";

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

  async function removeGoal(req, res) {
    const { goalId } = req.body;
    try {
      const result = await removeUserGoal(goalId);
      res.send({ message: "Trainingsziel erfolgreich entfernt" });
    } catch (error) {
      res.status(500).send({
        message: "Fehler beim Entfernen des Trainingsziels",
        error: error,
      });
    }
  }
  
  export { saveGoals, getGoals, removeGoal };