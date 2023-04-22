// ** calendar.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import Cookies from "js-cookie";
import withRouter from './withRouter.component'
class Schedule extends Component {
  constructor(props){
    super(props)
    this.state = { display: [["blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank"]], weekAdder: 0, teamGet: 1, dates: ["", "", "", "", "", "", ""] };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  componentDidMount(){
    axios.get("/schedule", { params: {weekAdder: this.state.weekAdder, teamGet: this.state.teamGet}, withCredentials: true, date: "", headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        this.setState({display: res.data.scheduleArray, dates: res.data.dates});
        console.log(this.state.display);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  handleButtonClick=(num)=>{
    this.setState({ weekAdder: this.state.weekAdder+num})
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
        <div class="col-md-1" style={{display: "inline-block", marginLeft: "auto", marginRight: "auto"}}>
          <button type="button" onClick={() => {this.handleButtonClick(-1)}}>
            <img src="left_arrow.png" style={{float: "left"}} width='75%' alt="Left Arrow"/>
          </button>
        </div>
        <div class="col-md-10" style={{display: "inline-block"}}>
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
               {this.state.display.map((d) => {
                return(
                  <tr>
                    <td>{d[0]}</td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[0]}}
                      >{d[2]}</Link>
                    </td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[1]}}
                      >{d[3]}</Link>
                    </td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[2]}}
                      >{d[4]}</Link>
                    </td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[3]}}
                      >{d[5]}</Link>
                    </td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[4]}}
                      >{d[6]}</Link>
                    </td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[5]}}
                      >{d[6]}</Link>
                    </td>
                    <td>
                      <Link to='/create-schedule'
                        state={{employee: d[0], id: d[1], date: this.state.dates[6]}}
                      >{d[8]}</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div class="col-md-1" style={{display: "inline-block"}}>
          <button type="button" onClick={() => {this.handleButtonClick(1)}}>
            <img src="right_arrow.png" style={{float: "right"}} width='75%' alt="Left Arrow"/>
          </button>
        </div>
      </div>
    )
  }
}
export default withRouter(Schedule);
