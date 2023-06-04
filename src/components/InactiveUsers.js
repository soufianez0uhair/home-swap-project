import { useState, useEffect } from "react";

function InactiveUsers({inaUsers, setInaUsers, users, handleAction}) {

  return (
    <table class="table">
      <tr>
        <th scope="col"><input onChange={(e) => handleAction(e, "")} name="checkAll" type="checkbox" /> Select all </th>
        <th scope="col">First name</th>
        <th scope="col">Last name</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
      {
        inaUsers && inaUsers.map(user => (
          <tr>
            <th scope="col"><input name="checkbox" onChange={(e) => handleAction(e, user.user_id)} type="checkbox" /></th>
            <th scope="col">{user.first_name}</th>
            <th scope="col">{user.last_name}</th>
            <th scope="col">{user.email}</th>
            <th scope="col">
              <select class="form-select form-select-md mb-3" onChange={(e) => handleAction(e, user.user_id)} >
                <option value="activate">activate</option>
                <option value="delete">delete</option>
              </select>
            </th>
          </tr>
        ))
      }
    </table>
  );
}

export default InactiveUsers;