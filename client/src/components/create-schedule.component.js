// ** create-schedule.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useLocation, Link } from 'react-router-dom';
import withRouter from './withRouter.component'
class CreateSchedule extends Component{
  constructor(props){
    super(props)
    this.state = {projectID: '', employeeName: '', employeeID: '', scheduleDate: '', showProjects: {data: [] } };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    this.setState({employeeName: this.props.location.state.employee, scheduleDate: this.props.location.state.date, employeeID: this.props.location.state.id});
    axios.get("/create-schedule", {headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        this.setState({showProjects: res.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  handleChange(change){
    this.setState({projectID: change.target.value});
  }
  onSubmit(change){
    change.preventDefault();
    const scedObj = {
      projectID: parseInt(this.state.projectID),
      employeeID: this.state.employeeID,
      scheduleDate: this.state.scheduleDate
    }
    console.log(scedObj);
    axios.post('/create-schedule2', scedObj)
      .then((res) => {
        console.log(res.data);
        this.setState({showProjects: res.data });
      }).catch((error) => {
        console.log(error)
      })
  }
  render(){
    return(
      <div className = "wrapper">
        <div class="col-md-12">
          <br></br>
          <h2>Create Schedule</h2>
          <br></br>
          <h3>Employee: {this.state.employeeName}</h3>
          <br></br>
          <h3>Date: {this.state.scheduleDate}</h3>
          <br></br>
          <h3>Select Project:</h3>
          <form onSubmit={this.onSubmit}>
            <select name="selectproject" id="selectproject" value={this.state.projectID} onChange={this.handleChange}>
              <option>Blank</option>
              {this.state.showProjects.data.map(function(d){
                return(
                  <option value={d.project_id}>{d.project_name}</option>
                )
              })}
            </select>
            <br></br>
            <br></br>
            <button type="submit">Create Schedule</button>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateSchedule);
