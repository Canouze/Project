import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import { useLocation, Link } from 'react-router-dom';
import withRouter from './withRouter.component'
class EditEmployee extends Component{
  constructor(props){
    super(props)
    this.state ={info: '', employeeID: 0, employeeName: '', employeeStartDate: '', employeeLevel: ''};
    this.handleChange1=this.handleChange1.bind(this);
    this.handleChange2=this.handleChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    let esd = "";
    let es = "";
    if(typeof this.props.location.state.employeeStartDate==="object"){
      esd = "Empty";
    }
    else{
      esd = this.props.location.state.employeeStartDate.slice(0,10);
    }
    if(typeof this.props.location.state.employeeLevel==="object"){
      es = "Empty";
    }
    else{
      es = this.props.location.state.employeeLevel
    }
    this.setState({employeeID: this.props.location.state.employeeID, employeeName: this.props.location.state.employeeName, employeeStartDate: esd, employeeLevel: es});
    console.log(this.state.employeeLevel);
  }
  handleChange1(change){
    this.setState({employeeStartDate: change.target.value});
  }
  handleChange2(change){
    this.setState({employeeLevel: change.target.value});
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
          <Link to='/view-employees'>
          <button>Return to Employee Viewer</button>
          </Link>
        </div>
      )
    }
  }
    onSubmit(change){
      change.preventDefault();
      console.log(this.state.employeeStartDate)
      const newObj ={
        employeeID: parseInt(this.state.employeeID),
        employeeStartDate: this.state.employeeStartDate,
        employeeLevel: this.state.employeeLevel
      }
      axios.post('/edit-employee', newObj, { headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then((res)=>{
        this.setState({info: res.data.message});
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    render(){
      return(
        <div className = "wrapper">
          <div class="col-md-4" style={{float: "left", paddingTop: "5em"}}>
            <br></br>
            <h2>Edit Employee Details</h2>
            <br></br>
            <form onSubmit={this.onSubmit}>
            <h5>Edit Employee Level</h5>
            <input type="range" name="deadline" onChange={this.handleChange2} min="0" max="5" value={this.state.employeeLevel} class="slider" id="deadline"/>
            <p>Level:<span id="deadline">{" "+this.state.employeeLevel}</span></p>
              <br></br>
              <h5>Edit Employee StartDate</h5>
              <input type="date" onChange={this.handleChange1}></input>
              <br></br>
              <br></br>
              <button type="submit">Make Changes</button>
            </form>
            </div>
            <div class="col-md-8" style={{display: "inline-block", textAlign: "center"}}>
              {this.additionalContent(this.state.info)}
            </div>
        </div>
      )
    }
}
export default withRouter(EditEmployee);
