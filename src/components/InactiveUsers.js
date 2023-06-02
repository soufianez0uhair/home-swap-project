import { useState, useEffect } from "react";

function InactiveUsers({inaUsers}) {

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
        inaUsers && inaUsers.map(user => (
          <tr>
            <th scope="col"><input type="checkbox" /></th>
            <th scope="col">{user.first_name}</th>
            <th scope="col">{user.last_name}</th>
            <th scope="col">{user.email}</th>
            <th scope="col">Action</th>
          </tr>
        ))
      }
    </table>
  );
}

export default InactiveUsers;