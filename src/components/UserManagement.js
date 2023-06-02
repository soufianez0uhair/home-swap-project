import React, { useState } from 'react'
import ManagementFilter from './ManagementFilter'
import InactiveUsers from './InactiveUsers';

const UserManagement = () => {
  const options = ['inactive users', 'by feedback'];

  const [option, setOption] = useState('inactive users');

  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <div className="UserManagement">
      <div className="UserManagement__button">
        <ManagementFilter options={options} setOption={setOption} />
      </div>
      {option === 'inactive users' && <InactiveUsers />}
    </div>
  )
}

export default UserManagement