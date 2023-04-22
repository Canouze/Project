import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function UserDashboard(){

  return(
    <div>
      <Link to="/user-admin">
        <h4>Employees</h4>
      </Link>
      <Link to="/project-admin">
        <h4>Project</h4>
      </Link>
      <Link to="/schedule">
        <h4>Schedule</h4>
      </Link>
      <button onClick={alertUniKey}>
        Alert
      </button>
    </div>
  )
}

export default AdminDashboard;
