import React from 'react';
import UserManagement from '../components/UserManagement';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-2 bg-primary">
          <ul className="ColumnList" >
            <li> <a className="ColumnList__link" href="#">Users management</a></li>
            <li> <a className="ColumnList__link" href="#">Accommodations management</a> </li>
          </ul>
        </div>
        <div className="col-10 AdminDashboard__right">
          <UserManagement />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;