import { useState, useEffect } from "react";

function AccommodationsByFeedback({feedbacks}) {

  return (
    <table class="table">
      <tr>
        <th scope="col"><input type="checkbox" /> Select all </th>
        <th scope="col">accommodation_id</th>
        <th scope="col">user_id</th>
        <th scope="col">rating</th>
        <th scope="col">comment</th>
        <th scope="col">Action</th>
      </tr>
      {
        feedbacks && feedbacks.map(feedback => (
          <tr>
            <th scope="col"><input type="checkbox" /> </th>
            <th scope="col">{feedback.accommodation_id}</th>
            <th scope="col">{feedback.user_id}</th>
            <th scope="col">{feedback.rating}</th>
            <th scope="col">{feedback.comment}</th>
            <th scope="col">Action</th>
          </tr>
        ))
      }
    </table>
  );
}

export default AccommodationsByFeedback;