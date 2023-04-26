// ** create-project.component.js** //
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
export default class CreateProject extends Component {
  constructor(props){
    super(props)
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeClientName = this.onChangeClientName.bind(this);
    this.onChangeProjectLocation = this.onChangeProjectLocation.bind(this);
    this.onChangeContactName = this.onChangeContactName.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeProjectDeadline = this.onChangeProjectDeadline.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {info: '', projectName: '', clientName: '', projectLocation: '', contactName: '', contactNumber: '', projectDeadline: ''};
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
  onChangeClientName(change){
    this.setState({clientName: change.target.value})
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
  additionalContent(info){
    if(info===""){
      return(
        <br></br>
      )
    }
    else{
      return(
        <div style={{paddingTop: "12em", textAlign: "centre"}}>
          <h4>{this.state.info}</h4>
          <br></br>
          <Link to='/view-projects'>
          <button>Return to Projects Viewer</button>
          </Link>
        </div>
      )
    }
  }
  onSubmit(change){
    change.preventDefault();
    const projObj = {
      projectName: this.state.projectName,
      clientName: this.state.clientName,
      projectLocation: this.state.projectLocation,
      contactName: this.state.contactName,
      contactNumber: this.state.contactNumber,
      projectDeadline: this.state.projectDeadline
    }
    axios.post('/create-project', projObj, { headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then((res) => {
        this.setState({info: res.data.message});
      }).catch((error) => {
        console.log(error)
      });
    this.setState({projectName: '', clientName: '', projectLocation: '', contactName: '', contactNumber: '', projectDeadline: ''})
  }
  render(){
    return(
      <div className = "wrapper">
      <div className = "col-md-8" style={{float: "left"}}>
        <form onSubmit={this.onSubmit} style={{marginLeft: "5em", marginTop: "5em", marginBottom: "10em"}}>
          <h2>Create Project</h2>
          <p>Enter project details...</p>
          <div className="col-md-4" style={{float: "left"}}>
          <label htmlFor="project_name"><b>Project Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="project_name" value={this.state.projectName} onChange={this.onChangeProjectName} required/>
          <br/>
          <br/>
          <label htmlFor="client_name"><b>Client Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="project_location" value={this.state.clientName} onChange={this.onChangeClientName} required/>
          <br/>
          <br/>
          <label htmlFor="project_location"><b>Project Location:</b></label>
          <br/>
          <input type="text" placeholder="" id="project_location" value={this.state.projectLocation} onChange={this.onChangeProjectLocation} required/>
          <br/>
          <br/>
          <button type="submit" className="login">Submit</button>
          </div>
          <div className="col-md-4" style={{float: "left"}}>
          <label htmlFor="contact_name"><b>Contact Name:</b></label>
          <br/>
          <input type="text" placeholder="" id="contact_name" value={this.state.contactName} onChange={this.onChangeContactName} required/>
          <br/>
          <br/>
          <label htmlFor="contact_number"><b>Contact Number:</b></label>
          <br/>
          <input type="text" placeholder="" id="contact_number" value={this.state.contactNumber} onChange={this.onChangeContactNumber} required/>
          <br/>
          <br/>
          <label htmlFor="project_deadline"><b>Project Deadline:</b></label>
          <br/>
          <input type="date" placeholder="" id="project_deadline" value={this.state.projectDeadline} onChange={this.onChangeProjectDeadline} required/>
        </div>
        </form>
        </div>
        <div className="col-md-4" style={{display: "inline-block", textAlign: "center"}}>
        {this.additionalContent(this.state.info)}
        </div>
      </div>
    );
  }
}
