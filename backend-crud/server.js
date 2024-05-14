const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());


//Etablir la connexion à la base de donnees
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbsmschool",
});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  //Etablir le port de connexion

  server.listen(8085,function check(error) {
    if (error) 
    {
    console.log("Erreur de lancement");
    }
    else 
    {
        console.log("le server est demarrer");
    }
});


//Creation de l'enrigistrement
server.post("/api/student/add", (req, res) => {
    let details = {
      stname: req.body.stname,
      course: req.body.course,
      fee: req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Echec de l'enrigidtrement" });
      } else {
        res.send({ status: true, message: "Enrigistrement avec succes" });
      }
    });
  });

  //AFFICHER DE L'ENRIGISTREMENT
server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Erreur de connxion à la BD");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
//CHERCHER SUR  L'ENRIGISTREMENT
server.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Erreur de connxion à la BD");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
//METTRE A JOUR DE L'ENRIGISTREMENT
server.put("/api/student/update/:id", (req, res) => {
    let sql =
      "UPDATE student SET stname='" +
      req.body.stname +
      "', course='" +
      req.body.course +
      "',fee='" +
      req.body.fee +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Echec de la ,ise à jour" });
      } else {
        res.send({ status: true, message: "Mise à jour de l'etudiant reussie" });
      }
    });
  });
  //SUPPRISSION DE L'ENRIGISTREMENT
  server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Echec de la suppression" });
      } else {
        res.send({ status: true, message: "Suppression reussie" });
      }
    });
  });