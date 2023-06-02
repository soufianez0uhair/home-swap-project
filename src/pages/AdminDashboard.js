import React, { useState } from 'react';
import UserManagement from '../components/UserManagement';
import AccommodationsManagement from '../components/AccommodationsManagement';

const Dashboard = () => {
  const [isUser, setIsUser] = useState(true);

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-2 bg-primary">
          <ul className="ColumnList" >
            <li> <a onClick={() => setIsUser(true)} className="ColumnList__link" href="#">Users management</a></li>
            <li> <a onClick={() => setIsUser(false)} className="ColumnList__link" href="#">Accommodations management</a> </li>
          </ul>
        </div>
        <div className="col-10 AdminDashboard__right">
          {isUser ? <UserManagement /> : <AccommodationsManagement />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;