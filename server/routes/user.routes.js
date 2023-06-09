const express = require('express');
const router = express.Router();
const dbp = require('../database/pool_connection');
const dbs = require('../database/standard_connection');
const standard_authentication = require('../authentication/standard_authentication');
const pool_authentication = require('../authentication/pool_authentication');
const check_authentication = require('../authentication/check_authentication');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ShortUniqueID = require('short-unique-id');
const validator = require('validator');
const createError = require('http-errors');
const async = require('async');
require("dotenv").config();

router.get('/check-auth', check_authentication, (req, res, next) => {

})

router.post('/edit-employee', standard_authentication, (req, res, next)=>{
  let select = 0;
  let {employeeID, employeeStartDate, employeeLevel} = req.body;
  console.log(employeeID)
  console.log(employeeStartDate)
  console.log(employeeLevel)
  if(employeeLevel!==""&&employeeStartDate!==""){
    const user = {user_level: employeeLevel, user_startdate: employeeStartDate}
    select = 1;
  }
  else if(employeeLevel!==""&&employeeStartDate===""){
    const user = {user_level: employeeLevel}
    select = 2;
  }
  else if(employeeStartDate!==""&&employeeLevel===""){
    const user = {user_startDate: employeeStartDate}
    select = 3;
  }
  else{
    return res.status(400).send({
      message: "Both field are empty"
    })
  }
  if(select===1){
    dbs.query("UPDATE users SET user_startdate = ?, user_level = ? WHERE user_id = ?;", [employeeStartDate, employeeLevel, employeeID], (error, result) => {
      if(error){
        console.log(error)
        return res.status(400).send({
          message: error
        });
      }
      console.log(result)
      return res.status(201).send({ message: "Updates completed successfully"})
    })
  }
  else if(select===2){
    dbs.query("UPDATE users SET user_level = ? WHERE user_id = ?;", [employeeLevel, employeeID], (error, result) => {
      console.log(error)
      if(error){
        return res.status(400).send({
          message: error
        });
      }
      return res.status(201).send({ message: "Employee Level Updated"})
    })
  }
  else if(select===3){
    dbs.query("UPDATE users SET user_startdate = ? WHERE user_id = ?;", [employeeStartDate, employeeID], (error, result) => {
      console.log(error)
      if(error){
        return res.status(400).send({
          message: error
        });
      }
      return res.status(201).send({ message: "Employee StartDate Updated"})
    })
  }
})


router.route('/register').post((req, res) => {
  let {userEmail, userPassword, userPassword2, userFname, userLname, isAdmin, teamKey, teamName} = req.body;
  const user = {user_email: userEmail, user_fname: userFname, user_lname: userLname, is_admin: isAdmin};
  const team = {};
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
  dbs.query("Select * FROM users WHERE user_email = '"+userEmail+"';", (error, result) => {
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
      if(isAdmin===true){
        team.team_name=teamName;
        const uid = new ShortUniqueID({length: 8});
        const unique_key=uid();
        team.team_key=unique_key;
        user.team_key=unique_key;
        user.team_name=teamName;
        queryPromise1 = () => {
          return new Promise((resolve, reject) => {
            dbp.query("INSERT INTO teams SET ?;",team, (error, result) => {
              if(error){
                return reject(error);
              }
              return resolve();
            })
          })
        }
        queryPromise2 = () => {
          return new Promise((resolve, reject) => {
            dbp.query("INSERT INTO users SET ?;",user, (error, result) => {
              if(error){
                return reject(error);
              }
              return resolve();
            })
          })
        }
        async function querySequence(){
          try{
            await queryPromise1();
            await queryPromise2();
          }
          catch(error){
            console.log(error);
            return res.status(500).send({
              message: "Server Error"
            });
          }
        }
        querySequence();
      }
      else{
        user.team_key=teamKey;
        queryPromise1 = () => {
          return new Promise((resolve, reject) => {
            dbp.query("SELECT * FROM teams WHERE team_key=?",user.team_key, (error, result) => {
              if(error){
                return reject(error);
              }
              if(result.length===0){
                return reject(new Error("No matching team exists for the given key"));
              }
              else{
                return resolve();
              }
            })
          })
        }
        queryPromise2 = () => {
          return new Promise((resolve, reject) => {
            dbp.query("INSERT INTO users SET ?;",user, (error, result) => {
              if(error){
                return reject(error);
              }
              return resolve();
            })
          })
        }
        async function querySequence(){
          try{
            await queryPromise1();
            await queryPromise2();
            res.send("Registration Successful")
          }
          catch(error){
            return res.status(500).send({
              message: error.message
            });
          }
        }
        querySequence();
      }
    });
  });
});

router.post('/view-employees', standard_authentication, (req, res, next) => {
  let {teamKey, startDate, level} = req.body;
  dbs.query("SELECT * from users WHERE is_admin = 0 AND team_key = ?;", teamKey, (error, result) => {
    if(error){
      console.log(error);
      return res.status(400).send({
        message: "error"
      })
    }
    let totalEmployees = result.length;
    let tempDisplay = [];
    var currDate = new Date();
    for(let i=0; i<result.length; i++){
      let date2 = new Date(result[i].user_startdate);
      let duration = (currDate.getTime()-date2.getTime())/86400000;
      if(result[i].user_level>=level && duration>=startDate){
        tempDisplay.push(result[i]);
      }
    }
    let filteredOut = totalEmployees-tempDisplay.length;
    res.send({displayEmployees: tempDisplay, filteredOut: filteredOut})
  })
})

router.get('/view-projects', standard_authentication, (req, res, next) => {
  dbs.query("SELECT * FROM projects", (error, result) => {
    if(error){
      return res.status(400).send({
        message: "error"
      });
    }
    let totalProjects = result.length;
    let tempDisplay = [];
    var days = parseInt(req.query.days);
    var currDate = new Date();
    for(let i=0; i<result.length; i++){
      var projectDate = new Date(result[i].project_deadline);
      var projectDuration = (projectDate.getTime()-currDate.getTime())/86400000;
      if(days>=projectDuration){
        tempDisplay.push(result[i]);
      }
    }
    let filteredOut = totalProjects-tempDisplay.length;
    res.send({displayProjects: tempDisplay, filteredOut: filteredOut});
  })
})
router.get('/ongoing', standard_authentication, (req, res, next) => {
  res.send("Yes it is working");
});

router.get('/create-schedule', standard_authentication, (req, res, next) => {
  dbs.query("SELECT * from projects", (error, result) => {
    if(error){
      return res.status(400).send({
        message: error
      });
    }
    return res.status(200).send({ data: result });
  })
})

router.post('/remove-schedule', standard_authentication, (req, res, next) => {
  let {employeeID, scheduleDate} = req.body;
  const proj = {user_id: employeeID, dt: scheduleDate};
  console.log(proj.user_id)
  console.log(proj.user_id+proj.dt);
  try{
    dbs.query("DELETE FROM schedule_event WHERE user_id = ? AND dt = ?;", [proj.user_id, proj.dt], (error, result) =>{
      if(error){
        return res.status(400).send({
          message: error
        })
      }
      console.log(result);
      return res.status(201).send({ message: "Schedule Event has been Removed"})
    })
  }
  catch{
    return res.status(500).send({
      message: "Server Error"
    });
  }
})

router.route('/create-schedule2', standard_authentication).post((req, res, next) => {
  let {employeeID, scheduleDate, projectID} = req.body;
  const sced = {user_id: employeeID, dt: scheduleDate, project_id: projectID};
  try{
    dbs.query("INSERT INTO schedule_event SET ?", sced, (error, result) => {
      if(error){
        return res.status(400).send({
          message: error
        });
      }
      return res.status(201).send({ message: "Schedule Event Created Successfuly"})
    })
    dbs.query("SELECT * from projects", (error, result) => {
      if(error){
        return res.status(400).send({
          message: error
        });
      }
      //return res.status(200).send({ data: result });
    })
  }
  catch(error){
    return res.status(500).send({
      message: "Server Error"
    });
  }
})

router.get('/schedule', pool_authentication, (req, res, next) => {
  var currDate = new Date().toISOString().slice(0,10);
  let weekAdder = parseInt(req.query.weekAdder);
  let teamGet = req.query.teamGet;
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
      dbs.query("SELECT w, y FROM calendar_table WHERE dt = ?", currDate, (error, result) => {
        if(error){
          return reject(error);
        }
        useYear = parseInt(result[0].y);
        picker = parseInt(result[0].w)+parseInt(weekAdder);
        if(picker>52){
          useYear++;
          picker = picker-52;
        }
        return resolve();
      })
    })
  }
  queryPromise2 = () => {
    return new Promise((resolve, reject) => {
      dbs.query("SELECT * from calendar_table WHERE y = ? AND w = ?", [useYear, picker], (error, result) => {
        if(error){
          return reject(error);
        }
        for(let i=0; i<result.length; i++){
          let useg = "";
          var makeD = result[i].d;
          var makeM = result[i].m;
          var makeY = result[i].y;
          useg+=makeY+"-";
          if(makeM<10){
            useg+="0"+makeM;
          }
          else{
            useg+=makeM;
          }
          useg+="-";
          if(makeD<10){
            useg+="0"+makeD;
          }
          else{
            useg+=makeD;
          }
          datesHold.push(useg);
        }
        return resolve();
      })
    })
  }
  queryPromise3 = () => {
    return new Promise((resolve, reject) => {
      dbs.query("SELECT * from users WHERE is_admin = 0 and team_key = ?;", teamGet, (error, result) => {
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
        employeeHold[i].goer.push(employeeHold[i].id);
        for(let j=0; j<datesHold.length; j++){
          dbs.query("SELECT project_name from schedule_event INNER JOIN projects ON schedule_event.project_id = projects.project_id AND user_id = ? AND dt = ?", [employeeHold[i].id, datesHold[j]], (error, result) => {
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

router.post('/create-project', standard_authentication, (req, res, next) => {
  let {projectName, clientName, projectLocation, contactName, contactNumber, projectDeadline} = req.body;
  const proj = {project_name: projectName, client_name: clientName, project_location: projectLocation, contact_name: contactName, contact_number: contactNumber, project_deadline: projectDeadline};
  try{
    dbs.query("INSERT INTO projects SET ?", proj, (error, result) => {
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
  if(req.body.userEmail.trim()==="" || req.body.userPassword.trim()===""){
    return res.status(400).send({ message: "Required fields remain empty"});
  }
  dbs.query("SELECT * FROM users WHERE user_email = '"+userEmail+"';", (error, result) => {
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
    bcrypt.compare(userPassword, result[0].user_password).then(isMatch => {
      if(isMatch===false){
        return res.status(401).send({
          message: "Incorrect Password"
        });
      }
      const token = jwt.sign({ id: result[0].user_id.toString() }, process.env.SECRET_KEY)
      res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });
      console.log(parseInt(result[0].is_admin));
      res.status(200).send({
        message: "Login Successful",
        user: {userID: result[0].user_id, teamKey: result[0].team_key, isAdmin: parseInt(result[0].is_admin)},
        token
      })
    });
  });
});
module.exports = router;
