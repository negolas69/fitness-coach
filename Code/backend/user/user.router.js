const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "d03d050",
  host: "w01cc2a0.kasserver.com",
  password: "F1tne55!",
  database: "d03d050",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const vorname = req.body.vorname;
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM TUser WHERE UserMail=?", [email], (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      res.send({ message: "Benutzer existiert" });
    } else {
      console.log("fortschritt");
      db.query(
        "INSERT INTO TUser (UserSurname, UserLastname, UserPassword, UserMail) VALUES (?,?,?,?)",
        [vorname, name, password, email],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Values Inserted");
          }
        }
      );
    }
  });
});

app.post("/Login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM TUser WHERE UserMail=? AND UserPassword=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        console.log("Login successful");
        res.send(result);
      } else {
        res.send({ message: "Falsche E-Mail oder Passwort Kombination" });
      }
    }
  );
});

//NFTName anzeigen
app.get("/NFTName", (req, res) => {
  db.query("SELECT * FROM TSongs", (err, result) => {
    if (err) {
      console.log("err");
    } else {
      res.send(result);
    }
  });
});

app.post("/Lend", (req, res) => {
  const selectedSong = req.body.selectedSong;
  const userId = req.body.userId;
  console.log(req.body);

  db.query(
    "SELECT count(*) FROM TAusleihen WHERE UserId=?",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length >= 5) {
        console.log("wrong");
        res.send({
          message:
            "Es sind bereits 5 Songs ausgeliehen, es können keine Weiteren Songs ausgeliehen werden",
        });
      } else {
        db.query(
          "SELECT * FROM TAusleihen WHERE SongId=?",
          [selectedSong],
          (err, result) => {
            if (err) {
              console.log(err);
            } else if (result.length > 0) {
              res.send({ message: "Dieser Song ist bereits ausgeliehen" });
            } else {
              db.query(
                "INSERT INTO TAusleihen (AusleihDatum,UserId,SongId)VALUES(now(), ?, ?)",
                [userId, selectedSong],
                (err) => {
                  if (err) {
                    console.log("Ausleih-error: ", err);
                  } else {
                    res.send({ message: "Dieser Song wurde ausgeliehen" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.post("/getUserId", (req, res) => {
  const mail = req.body.userMail;
  console.log(mail);
  db.query(
    "SELECT UserId FROM TUser WHERE UserMail=?",
    [mail],
    (err, result) => {
      if (err) {
        console.log("err");
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/returnLend", (req, res) => {
  const id = req.body.userId;
  const songReturn = req.body.selectedSong;
  db.query(
    "delete from TAusleihen where UserId=?and SongId=?",
    [id, songReturn],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "Song erfolgreich zurückgegeben" });
      }
    }
  );
});

app.post("/checkLends", (req, res) => {
  const idUser = req.body.userId;
  console.log(req.body);
  db.query(
    "SELECT TSongs.SongId, TSongs.SongName, TSongs.SongInterpret, TSongs.SongLaenge, TSongs.SongJahr, TAusleihen.AusleihDatum FROM TSongs, TAusleihen WHERE TAusleihen.UserId=? and TSongs.SongId=TAusleihen.SongId",
    [idUser],
    (err, result) => {
      console.log(result);
      console.log(idUser);
      if (err) {
        console.log(err);
      } else if (result.length == 0) {
        res.send({ message: "Keine Songs ausgeliehen", data: result });
      } else {
        res.send({ data: result });
      }
    }
  );
});

//UserInformationen
app.get("/getUserInformation", (req, res) => {
  db.query(
    "SELECT TUser.UserSurname, TUser.UserLastname, TSongs.SongName, TSongs.SongLaenge, TSongs.SongInterpret, TAusleihen.AusleihDatum, TAusleihen.UserId, TAusleihen.SongId, TAusleihen.AusleihId from TUser, TAusleihen, TSongs where TSongs.SongId = TAusleihen.SongId and TAusleihen.UserId = TUser.UserId;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/removeLend", (req, res) => {
  const ausleihId = req.body.idAusleih;
  db.query(
    "DELETE FROM TAusleihen WHERE AusleihId=?",
    [ausleihId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "Ausleihe erfolgreich gelöscht" });
      }
    }
  );
});

app.post("/removeUser", (req, res) => {
  const userId = req.body.idUser;
  db.query("DELETE FROM TAusleihen WHERE UserId=?", [userId], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query("DELETE FROM TUser WHERE UserId=?", [userId], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ message: "Benutzer erfolgreich gelöscht" });
        }
      });
    }
  });
});

app.post("/checkAdmin", (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  db.query(
    "SELECT * FROM TUser WHERE UserId=? AND UserAdmin=1",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
app.listen(3001, () => {
  console.log("Server is Running");
});
