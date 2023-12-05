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

export { getUser, getUserByUsername, createUser };
