import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Cookies from "js-cookie";
import Login from './components/login.component'
import Register from './components/register.component'
import Ongoing from './components/ongoing.component'
import Schedule from './components/schedule.component'
import CreateProject from './components/create-project.component'
import CreateSchedule from './components/create-schedule.component'
import withRouter from './components/withRouter.component'
import AdminDashboard from './components/admin-dashboard.component'
import ViewProjects from './components/view-projects.component'
const createError = require('http-errors');
function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">SmartSchedule</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to={'/register'}>Home</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={'/login'}>Login</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={'/ongoing'}>Ongoing</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to={'/schedule'}>Schedule</Link>
                </li>
                <li className="nav-item active">
                  <Link onClick={() => Cookies.remove('token')} className="nav-link" to={'/login'}>Logout</Link>
                </li>
              </ul>
            </div>
          </nav>
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
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/view-projects" element={<ViewProjects />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
