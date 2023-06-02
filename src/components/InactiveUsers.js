import { useState, useEffect } from "react";
import axios from 'axios';
import {APIBASEURL} from '../helpers/sharedVariables';
import {selectAdmin} from '../redux/adminSlice';
import {useSelector} from 'react-redux';
function InactiveUsers() {
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const admin = useSelector(state => selectAdmin(state));

  const getInactiveUsers = async () => {
    await axios.post(APIBASEURL + 'get_inactive_users.php', JSON.stringify({
      email: admin.email,
      password: admin.password,
      seen_ids: inactiveUsers
    }))
    .then(res => setInactiveUsers(res.data.inactive_users)) }

  console.log(inactiveUsers);
  useEffect(() => {
    getInactiveUsers()
  }, []);

  return (
    <table class="table">
      <tr>
        <th scope="col"><input type="checkbox" /> Select all </th>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
      {
        inactiveUsers && inactiveUsers.map(user => (
          <tr>
            <th scope="col"><input type="checkbox" /> Select all </th>
            <th scope="col">{user.first_name}</th>
            <th scope="col">{user.last_name}</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        ))
      }
    </table>
  );
}

export default InactiveUsers;