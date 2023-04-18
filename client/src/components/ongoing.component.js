// ** ongoing.component.js ** //
import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
export default class Ongoing extends Component {
  constructor(props){
    super(props)
    this.state = { show: "Nope" };
  }
  componentDidMount(){
    axios.get("/ongoing", { withCredentials: true, headers: {"Authorisation" : `Bearer ${Cookies.get('token')}`} })
      .then(res => {
        console.log(res);
        this.setState({show: res.data});
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  info(){
    return this.state.show;
  }
  render(){
    return(
      <div className = "wrapper">
        <h1>{this.info()}</h1>
      </div>
    )
  }
}
