const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const authentication = require('../authentication/authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const createError = require('http-errors');
const async = require('async');
require("dotenv").config();

router.route('/register').post((req, res) => {
  let {userEmail, userPassword, userPassword2, userFname, userLname} = req.body;
  const user = {user_email: userEmail, user_fname: userFname, user_lname: userLname};
  console.log(user);
  if(!userEmail || !validator.isEmail(userEmail)){
    return res.status(400).send({
      message: "Please enter a valid email"
    });
  }
  if(!userPassword || userPassword.length < 6){
    return res.status(400).send({
      message: "Please enter a password with at least 6 characters"
    });
  }
  if(!userPassword2 || userPassword != userPassword2){
    return res.status(400).send({
      message: "Passwords do not match"
    });
  }
  db.query("Select * FROM users WHERE user_email = '"+userEmail+"';", (error, result) => {
    if(error){
      return res.status(400).send({
        message: error
      });
    }
    if(result.length!==0){
      return res.status(409).send({
        message: "This email address is already in use"
      });
    }
    bcrypt.hash(userPassword, 8).then((hash) => {
      user.user_password=hash;
    }).then(() => {
      console.log(user);
      db.query("INSERT INTO users SET ?;",user, (error, result) => {
        if(error){
          return res.status(400).send({
            message: error
          });
        }
        return res.status(201).send({ message: "Registration Successful"})
      });
    });
  });
});

router.get('/ongoing', authentication, (req, res, next) => {
  res.send("Yes it is working");
});

router.get('/create-schedule', authentication, (req, res, next) => {
  db.query("SELECT * from projects", (error, result) => {
    if(error){
      return res.status(400).send({
        message: error
      });
    }
    return res.status(200).send({ data: result });
  })
})

router.get('/schedule', authentication, (req, res, next) => {
  var currDate = new Date().toISOString().slice(0,10);
  console.log(currDate);
  let weekAdder = parseInt(req.query.weekAdder);
  let teamGet = parseInt(req.query.teamGet);
  function employee(id, first, last) {
    this.id = id;
    this.firstName = first;
    this.lastName = last;
    this.goer = [];
  }
  let datesHold = [];
  let employeeHold = [];
  let displaySchedule = [];
  let useYear = 0;
  let picker = 0;

  queryPromise1 = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT w, y FROM calendar_table WHERE dt = ?", currDate, (error, result) => {
        if(error){
          return reject(error);
        }
        useYear = parseInt(result[0].y);
        picker = parseInt(result[0].w)+weekAdder;
        if(picker>52){
          useYear++;
          picker = picker-52;
        }
        console.log(picker);
        return resolve();
      })
    })
  }
  queryPromise2 = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from calendar_table WHERE y = ? AND w = ?", [useYear, picker], (error, result) => {
        if(error){
          return reject(error);
        }
        for(let i=0; i<result.length; i++){
          datesHold.push(result[i].dt.toISOString().slice(0,8)+((parseInt(result[i].dt.toISOString().slice(8,10)))+1).toString());
        }
        console.log(datesHold);
        return resolve();
      })
    })
  }
  queryPromise3 = () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * from users WHERE is_admin = 0", (error, result) => {
        if(error){
          return reject(error);
        }
        for(let i=0; i<result.length; i++){
          employeeHold.push(new employee(result[i].user_id, result[i].user_fname, result[i].user_lname));
        }
        return resolve();
      })
    })
  }
  queryPromise4 = () => {
    let counter = 0;
    return new Promise((resolve, reject) => {
      for(let i=0; i<employeeHold.length; i++){
        employeeHold[i].goer.push(employeeHold[i].firstName+" "+employeeHold[i].lastName);
        for(let j=0; j<datesHold.length; j++){
          db.query("SELECT project_name from schedule_event INNER JOIN projects ON schedule_event.project_id = projects.project_id AND user_id = ? AND dt = ?", [employeeHold[i].id, datesHold[j]], (error, result) => {
            if(error){
              return reject(error);
            }
            else if(result.length===0){
              employeeHold[i].goer.push("Available");
            }
            else{
              employeeHold[i].goer.push(result[0].project_name);
            }
            counter++;
            if(counter>=(employeeHold.length*datesHold.length)){
              return resolve();
            }
          })
        }
      }
    })
  }
  queryPromise5 = () => {
    return new Promise((resolve, reject) => {
      let tempArray = [];
      for(let i=0; i<employeeHold.length; i++){
        tempArray.push(employeeHold[i].goer);
      }
      res.status(200).send({
        scheduleArray: tempArray,
        dates: datesHold
      })
      return resolve();
    })
  }

  /*function creator(){
    let tempArray = [];
    for(let i=0; i<employeeHold.length; i++){
      tempArray.push(employeeHold[i].firstName+" "+employeeHold[i].lastName);
      tempArray.push(employeeHold[i].goer);
    }
    displaySchedule.push(tempArray);
  }
  creator();
  console.log(displaySchedule);
  res.status(200).send({
    scheduleArray: displaySchedule
  })*/

  async function querySequence(){
    try{
      await queryPromise1();
      await queryPromise2();
      await queryPromise3();
      await queryPromise4();
      await queryPromise5();
    }
    catch(error){
      console.log(error);
      return res.status(500).send({
        message: "Server Error"
      });
    }
  }
  querySequence();
});

router.route('/create-project', authentication).post((req, res, next) => {
  let {projectName, projectLocation, contactName, contactNumber, projectDeadline} = req.body;
  const proj = {project_name: projectName, project_location: projectLocation, contact_name: contactName, contact_number: contactNumber, project_deadline: projectDeadline};
  try{
    db.query("INSERT INTO projects SET ?", proj, (error, result) => {
      if(error){
        return res.status(400).send({
          message: error
        });
      }
      return res.status(201).send({ message: "Project Created Successfuly"})
    })
  }
  catch(error){
    return res.status(500).send({
      message: "Server Error"
    });
  }
})

router.route('/login').post((req, res) => {
  const {userEmail, userPassword} = req.body;
  console.log(userEmail);
  if(req.body.userEmail.trim()==="" || req.body.userPassword.trim()===""){
    return res.status(400).send({ message: "Required fields remain empty"});
  }
  db.query("SELECT * FROM users WHERE user_email = '"+userEmail+"';", (error, result) => {
    if(error){
      return res.status(400).send({
        message: error
      });
    }
    if(result.length===0){
      return res.status(401).send({
        message: "There is no registered user with this email address"
      });
    }
    console.log(userPassword);
    console.log(result[0].user_password);
    bcrypt.compare(userPassword, result[0].user_password).then(isMatch => {
      console.log(isMatch);
      if(isMatch===false){
        return res.status(401).send({
          message: "Incorrect Password"
        });
      }
      const token = jwt.sign({ id: result[0].user_id.toString() }, process.env.SECRET_KEY)
      res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
      res.status(200).send({
        message: "Login Successful",
        user: result[0],
        token
      })
    });
  });
});
module.exports = router;
