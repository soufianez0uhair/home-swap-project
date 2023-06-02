import { useState, useEffect } from "react";
import { BASEURL } from "../helpers/sharedVariables";
import { Link } from "react-router-dom";

function PendingAccommodations({accommodations}) {

  return (
    <table class="table">
      <tr>
        <th scope="col"><input type="checkbox" /> Select all </th>
        <th scope="col">accommodation_id</th>
        <th scope="col">user_id</th>
        <th scope="col">link</th>
        <th scope="col">Action</th>
      </tr>
      {
        accommodations && accommodations.map(accommodation => (
          <tr>
            <th scope="col"><input type="checkbox" /></th>
            <th scope="col">{accommodation.accommodation_id}</th>
            <th scope="col">{accommodation.user_id}</th>
            <th scope="col"> <Link target="_blank" to={`${BASEURL + 'accommodations/' + accommodation.accommodation_id}`} >open link</Link></th>
            <th scope="col">Action</th>
          </tr>
        ))
      }
    </table>
  );
}

export default PendingAccommodations;