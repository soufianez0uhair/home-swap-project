import { useState, useEffect } from "react";
import { BASEURL } from "../helpers/sharedVariables";
import { Link } from "react-router-dom";

function PendingAccommodations({accommodations,setSentAccos, sentAccos}) {
  function handleChange(e,id) {
    if(e.target.checked) {
      setSentAccos({
        ...sentAccos,
        actions: [...sentAccos.actions, actions.find(action => action.accommodation_id == id)]
      })
    } else {
      setActions(
        actions.filter(action => action.accommodation_id != id))
        setSentAccos({
          ...sentAccos,
          actions: [...sentAccos.actions, actions.find(action => action.accommodation_id == id)]
        })
    }
  }

  const [actions, setActions] = useState([]);

  function handleAction(id, e) {
    const newActions = actions.filter(act => act.accommodation_id != id)
    setActions([
      ...newActions,
      {
        accommodation_id: id,
        action: e.target.value
      }
    ])
  }
  console.log(sentAccos,actions)
  return (
    <table class="table">
      <tr>
        <th scope="col"><input type="checkbox" /> Select all </th>
        <th scope="col">link</th>
        <th scope="col">Action</th>
      </tr>
      {
        accommodations && accommodations.map(accommodation => (
          <tr>
            <th scope="col"><input onChange={(e) => handleChange(e,accommodation.accommodation_id)} type="checkbox" /></th>
            <th scope="col"> <Link target="_blank" to={`${BASEURL + 'accommodations/' + accommodation.accommodation_id}`} >open link</Link></th>
            <th scope="col"><select onChange={(e) => handleAction(accommodation.accommodation_id,e)} name="action" id="">
              <option value="accept">Accepter</option>
              <option value="delete">Delete</option>
              </select></th>
          </tr>
        ))
      }
    </table>
  );
}

export default PendingAccommodations;