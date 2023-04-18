// ** create-schedule.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
export default class CreateSchedule extends Component {
  constructor(props){
    super(props)
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.state = { showProjects: {data: [] }, message: this.props.location.state.message};
  }
  componentDidMount(){
    axios.get("/create-schedule", {headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        this.setState({showProjects: res.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onChangeProjectName(change){
    this.setState({ projectName: change.target.value })
  }
  onSubmit(change){
    change.preventDefault();
    const scedObj = {
      projectName: this.state.projectName
    }
  }
  render(){
    return(
      <div className = "wrapper">
          <select name="selectproject" id="selectproject">
            <option>Blank</option>
            {this.state.showProjects.data.map(function(d){
              return(
                <option key={d.project_id}>{d.project_name}</option>
              )
            })}
          </select>
      </div>
    )
  }
}
