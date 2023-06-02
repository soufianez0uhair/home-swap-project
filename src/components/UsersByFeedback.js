import { useState, useEffect } from "react";

function UsersByFeedback({feedbacks}) {

  return (
    <table class="table">
      <tr>
        <th scope="col"><input type="checkbox" /> Select all </th>
        <th scope="col">user_id</th>
        <th scope="col">owner_id</th>
        <th scope="col">rating</th>
        <th scope="col">comment</th>
        <th scope="col">Action</th>
      </tr>
      {
        feedbacks && feedbacks.map(user => (
          <tr>
            <th scope="col"><input type="checkbox" /> </th>
            <th scope="col">{user.user_id}</th>
            <th scope="col">{user.owner_id}</th>
            <th scope="col">{user.rating}</th>
            <th scope="col">{user.comment}</th>
            <th scope="col">Action</th>
          </tr>
        ))
      }
    </table>
  );
}

export default UsersByFeedback;