// ** calendar.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie";
export default class Schedule extends Component {
  constructor(props){
    super(props)
    this.state = { display: [["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"]], weekAdder: 0, teamGet: 1, dates: ["", "", "", "", "", "", ""] };
  }
  componentDidMount(){
    axios.get("/schedule", { params: {weekAdder: this.state.weekAdder, teamGet: this.state.teamGet}, withCredentials: true, date: "", headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        this.setState({display: res.data.scheduleArray, dates: res.data.dates});
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render(){
    return(
      <div className = "wrapper">
        <div class="container-fluid">
          <table id='schedule_table' width='100%' border='1'>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
              <tr>
                <td></td>
                <td>{this.state.dates[0]}</td>
                <td>{this.state.dates[1]}</td>
                <td>{this.state.dates[2]}</td>
                <td>{this.state.dates[3]}</td>
                <td>{this.state.dates[4]}</td>
                <td>{this.state.dates[5]}</td>
                <td>{this.state.dates[6]}</td>
              </tr>
            </thead>
            <tbody>
              {this.state.display.map(function(d){
                return(
                  <tr>
                    <td>{d[0]}</td>
                    <td name={d[0]} date="0">{d[1]}</td>
                    <td name={d[0]} date="1">{d[2]}</td>
                    <td name={d[0]} date="2">{d[3]}</td>
                    <td>
                      <Link to={{
                        pathname: '/create-schedule',
                        state: {message: "hello ivan"}}}
                      > {d[4]}</Link>
                    </td>
                    <td name={d[0]} date="4">{d[5]}</td>
                    <td name={d[0]} date="5">{d[6]}</td>
                    <td name={d[0]} date="6">{d[7]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
