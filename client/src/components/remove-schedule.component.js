
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useLocation, Link } from 'react-router-dom';
import withRouter from './withRouter.component'

class RemoveSchedule extends Component{
  constructor(props){
    super(props)
    this.state = {info: '', projectID: '', projectName: '', employeeName: '', employeeID: '', scheduleDate: ''};
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    this.setState({employeeName: this.props.location.state.employee, employeeID: this.props.location.state.id, projectName: this.props.location.state.project, scheduleDate: this.props.location.state.date})
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
          <Link to='/schedule'>
          <button>Return to Schedule</button>
          </Link>
        </div>
      )
    }
  }
  onSubmit(change){
    change.preventDefault();
    const scedObj = {
      employeeID: this.state.employeeID,
      scheduleDate: this.state.scheduleDate
    }
    axios.post('/remove-schedule', scedObj, { headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
    .then((res)=> {
      this.setState({info: res.data.message})
    })
    .catch((error) => {
      console.log(error)
    })
  }
  render(){
    return(
      <div className="wrapper">
      <div className="col-md-4" style={{float: "left", paddingTop: "5em"}}>
      <h2>Remove Schedule Event?</h2>
      <br></br>
      <h3>Employee: {this.state.employeeName}</h3>
      <br></br>
      <h3>Date: {this.state.scheduleDate}</h3>
      <br></br>
      <button onClick={this.onSubmit}>
      Delete
      </button>
      </div>
      <div class="col-md-8" style={{display: "inline-block", textAlign: "center"}}>
        {this.additionalContent(this.state.info)}
      </div>
      </div>
    )
  }
}
export default withRouter(RemoveSchedule);
