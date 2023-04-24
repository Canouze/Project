import React, {useState} from 'react';
import {Link} from 'react-router-dom';

function AdminDashboard(){
  const [uniKey, setUniKey] = useState('placeholder');
  const alertUniKey = () => {
    alert(uniKey);
  }
  return(
    <div>
      <h1>Admin Dashboard</h1>
      <Link to="/employee-admin">
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
