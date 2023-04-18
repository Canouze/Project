const jwt = require("jsonwebtoken");
const db = require("../database/connection.js");
const createError = require('http-errors');

const authentication = async(req, res, next) => {
  try{
    const idToken = req.header('Authorisation').replace('Bearer ', '');
    const decoded = jwt.verify(idToken, process.env.SECRET_KEY);
    req.id = decoded.id;
    /* db.query("SELECT * FROM users WHERE user_id = ?", decoded.id, (error, result) => {
      if(error){
        return res.status(400).send({
          message: error
        });
      }
    });*/
    return next();
  }
  catch(error){
    console.log(error);
    res.status(401).send({ error: "Please login" });
  }
};

module.exports = authentication;
