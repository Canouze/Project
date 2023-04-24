import React, {useState, useEffect} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Cookies from "js-cookie";
import Login from './components/login.component'
import Register from './components/register.component'
import Ongoing from './components/ongoing.component'
import Schedule from './components/schedule.component'
import CreateProject from './components/create-project.component'
import CreateSchedule from './components/create-schedule.component'
import withRouter from './components/withRouter.component'
import ViewProjects from './components/view-projects.component'
import AdminDashboard from './components/admin-dashboard.component'
import UserDashboard from './components/user-dashboard.component'
import Logout from './components/logout.component'

const createError = require('http-errors');
function App() {
  const [userObj, setUserObj] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  useEffect(() => {
    axios.get("/check-auth", {withCredentials: true, headers: {"Authorisation": `Bearer ${Cookies.get('token')}`} })
    .then(res => {
      setUserObj(res.data);
      setLoggedIn(true);
    })
    .catch(function (error) {
      setLoggedIn(false);
    })
  }, [])
  const handleMenu = e => {
    if(loggedIn===true){
      return(
        <Link style={{color: "black", fontWeight: "bold"}} className="nav-link" to={'/logout'}>Logout</Link>
      )
    }
    else{
      return(
        <Link style={{color: "black", fontWeight: "bold"}} className="nav-link" to={'/login'}>Login</Link>
      )
    }
  }
  return (
    <Router>
      <div className="App">
        <header>
          <Navbar bg="dark" variant="dark">
            <Nav className="container-fluid">
              <Nav.Item>
                <Navbar.Brand as={Link} to="/">
                  <img src="main_icon.png" width="50" style={{height: "auto", marginLeft: "2em"}} alt="Main Icon"/>
                </Navbar.Brand>
              </Nav.Item>
              <Navbar.Brand as={Link} to="/">
                SmartSchedule
              </Navbar.Brand>
              <Nav.Item className="ms-auto">
                <Nav.Link as={Link} to="/user-list" style={{height: "auto", marginLeft: "2em"}}>{userObj.userName}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <img src="user_icon.png" width="40" style={{height: "auto"}} alt="Main Icon"/>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown align="end">
                  <NavDropdown.Item>
                    <Link style={{color: "black", fontWeight: "bold"}} className="nav-link" to={'/dashboard'}>Dashboard</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    {handleMenu()}
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            </Nav>
          </Navbar>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/ongoing" element={<Ongoing />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/create-schedule" element={<CreateSchedule />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="view-projects" element={<ViewProjects />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
