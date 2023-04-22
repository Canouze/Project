// ** create-project.component.js** //
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
export default class CreateProject extends Component {
  constructor(props){
    super(props)
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeProjectLocation = this.onChangeProjectLocation.bind(this);
    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeProjectDeadline = this.onChangeProjectDeadline.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {projectName: '', projectLocation: '', contactName: '', contactNumber: '', projectDeadline: ''};
  }
  componentDidMount(){
    axios.get("/check-auth", { headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onChangeProjectName(change){
    this.setState({ projectName: change.target.value })
  }
  onChangeProjectLocation(change){
    this.setState({ projectLocation: change.target.value })
  }
  onChangeContactName(change){
    this.setState({ contactName: change.target.value })
  }
  onChangeContactNumber(change){
    this.setState({ contactNumber: change.target.value })
  }
  onChangeProjectDeadline(change){
    this.setState({ projectDeadline: change.target.value })
  }
  onSubmit(change){
    change.preventDefault();
    const projObj = {
      projectName: this.state.projectName,
      projectLocation: this.state.projectName,
      contactName: this.state.contactName,
      contactNumber: this.state.contactNumber,
      projectDeadline: this.state.projectDeadline
    }
    axios.post('/create-project', projObj)
      .then((res) => {
      }).catch((error) => {
        console.log(error)
      });
    this.setState({projectName: '', projectLocation: '', contactName: '', contactNumber: '', projectDeadline: ''})
  }
  render(){
    return(
      <div className = "wrapper">
        <form onSubmit={this.onSubmit} style={{marginLeft: "10em", marginTop: "10em", marginBottom: "10em"}}>
          <h2>Create Project</h2>
          <p>Enter project details...</p>
          <label htmlFor="project_name"><b>Project Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="project_name" value={this.state.projectName} onChange={this.onChangeProjectName} required/>
          <br/>
          <br/>
          <label htmlFor="project_location"><b>Project Location:</b></label>
          <br/>
          <br/>
          <input type="text" placeholder="" id="project_location" value={this.state.projectLocation} onChange={this.onChangeProjectLocation} required/>
          <br/>
          <br/>
          <label htmlFor="contact_name"><b>Contact Name:</b></label>
          <br/>
          <br/>
          <input type="text" placeholder="" id="contact_name" value={this.state.contactName} onChange={this.onChangeContactName} required/>
          <br/>
          <br/>
          <label htmlFor="contact_number"><b>Contact Number:</b></label>
          <br/>
          <br/>
          <input type="text" placeholder="" id="contact_number" value={this.state.contactNumber} onChange={this.onChangeContactNumber} required/>
          <br/>
          <br/>
          <label htmlFor="project_deadline"><b>Project Deadline:</b></label>
          <br/>
          <br/>
          <input type="date" placeholder="" id="project_deadline" value={this.state.projectDeadline} onChange={this.onChangeProjectDeadline} required/>
          <br/>
          <br/>
          <button type="submit" className="login">Submit</button>
        </form>
      </div>
    );
  }
}
