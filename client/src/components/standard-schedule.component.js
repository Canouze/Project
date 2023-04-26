import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './stylesheet.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import withRouter from './withRouter.component'
const async = require('async');

function StandardSchedule(){
  let navigate = useNavigate();
  const [display, setDisplay] = useState([["", "", "", "", "", "", "", ""]]);
  const [weekAdder, setWeekAdder] = useState(0);
  const [teamGet, setTeamGet] = useState("");
  const [dates, setDates] = useState(["", "", "", "", "", "", ""])
  useEffect(() => {
    axios.get("/schedule", { params: {weekAdder: weekAdder, teamGet: Cookies.get("teamID")}, withCredentials: true, date: "", headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        setDisplay(res.data.scheduleArray);
        setDates(res.data.dates);
      })
      .catch(function (error) {
        if(error.response.data.error==="Please login"){
          navigate('/login');
        }
        console.log("Server Error");
      })
  }, [])
  const querySelector1 = (num) => {
    return new Promise((resolve, reject) => {
      console.log(weekAdder);
      setWeekAdder(weekAdder+num)
      console.log(weekAdder);
      return resolve();
    })
  }
  const querySelector2 = () => {
    return new Promise((resolve, reject) => {
      axios.get("/schedule", { params: {weekAdder: weekAdder, teamGet: Cookies.get("teamID")}, withCredentials: true, date: "", headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
        .then(res => {
          setDisplay(res.data.scheduleArray);
          setDates(res.data.dates);
        })
        .catch(function (error) {
          console.log(error);
        })
      return resolve();
    })
  }

  async function handleButtonClick(num){
    let use = num;
    await querySelector1(use);
    await querySelector2();
  }

  return(
    <div className = "wrapper">
      <div class="col-md-12" style={{display: "inline-block", paddingTop: "2em"}}>
        <table id='schedule_table' width='100%' border='1' style={{border: "1px solid"}}>
          <thead>
            <tr style={{height: "50px", border: "1px solid", backgroundColor: "#5F9EA0", color: "white"}}>
              <th></th>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
            <tr style={{height: "50px", border: "1px solid"}}>
              <td style={{backgroundColor: "#5F9EA0"}}>
                <button type="button" onClick={() => handleButtonClick(-1)}>
                  <img src="left_arrow.png" style={{float: "left"}} height="30px" alt="Left Arrow"/>
                </button>
                <button type="button" onClick={() => {handleButtonClick(1)}}>
                  <img src="right_arrow.png" style={{float: "right"}} height="30px" alt="Left Arrow"/>
                </button>
              </td>
              <td>{dates[0]}</td>
              <td>{dates[1]}</td>
              <td>{dates[2]}</td>
              <td>{dates[3]}</td>
              <td>{dates[4]}</td>
              <td>{dates[5]}</td>
              <td>{dates[6]}</td>
            </tr>
          </thead>
          <tbody>
             {display.map((d) => {
              return(
                <tr style={{border: "1px solid"}}>
                  <td style={{backgroundColor: "#5F9EA0", color: "white"}}>{d[0]}</td>
                  <td style={ d[2]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[2]}
                  </td>
                  <td style={ d[3]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[3]}
                  </td>
                  <td style={ d[4]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[4]}
                  </td>
                  <td style={ d[5]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[5]}
                  </td>
                  <td style={ d[6]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[6]}
                  </td>
                  <td style={ d[7]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[7]}
                  </td>
                  <td style={ d[8]!="Available" ? { backgroundColor: "#B0C4DE"} : {}}>
                    {d[8]}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default StandardSchedule;
