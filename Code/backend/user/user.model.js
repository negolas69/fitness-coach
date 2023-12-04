import * as mysql from "mysql2";

const db = mysql.createConnection({
  user: "d03ed050",
  host: "w01cc2a0.kasserver.com",
  password: "F1tne55!",
  database: "d03ed050",
});

function getUser(username, email) {
  db.query(
    "SELECT * FROM TUsers WHERE username=? AND email=?",
    [username, email],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        res.send({ message: "Benutzer existiert" });
      } else {
        res.send(undefined);
      }
    }
  );
}

function createUser(username, firstname, lastname, email, password, password2) {
  db.query(
    "INSERT INTO TUsers (username,firstname,lastname,email,password,password2) VALUES (?, ?, ?, ?, ?, ?)",
    [username, firstname, lastname, email, password, password2],
    (err) => {
      if (err) {
        console.log("user error", err);
      } else {
        res.send({ message: "User eingefügt" });
      }
    }
  );
}

export { getUser, createUser };
