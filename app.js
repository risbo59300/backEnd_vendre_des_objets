const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const stuffRoutes = require("./routes/stuffRoutes");
const userRoutes = require("./routes/userRoutes");

const path = require('path');

const app = express(); //Creation d'une application express

app.use(express.json());

//connection a mongoDb
mongoose
  .connect(
    "mongodb+srv://risbo59300:risbo59300@myapp.1s5kx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/**Prise en compte des erreurs du type cross-orign */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
