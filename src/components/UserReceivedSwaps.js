import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { APIBASEURL } from '../helpers/sharedVariables';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {FiExternalLink} from 'react-icons/fi';
import AlertModal from './AlertModal';
const UserReceivedSwaps = () => {
  const [swaps, setSwaps] = useState(null);
  const [state, setState] = useState("pending");
  useEffect(() => {
    const getSwaps = async () => {
      await axios.post(APIBASEURL + "get_received_swaps.php", JSON.stringify({
        token: JSON.parse(localStorage.getItem("token")),
        state
      }))
      .then((res) => {
        console.log(res)
        setSwaps(res.data.swaps)
      })
      .catch(e => console.log(e))
    }
    getSwaps();
  }, [state])
  
  const navigate = useNavigate()
  const handleChange = (e) => {
    setState(e.target.value);
  }
  // cancel sent swap function
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("accept");

  async  function handleClick(id, action) {
    await axios.post(APIBASEURL + "action_on_swap.php", JSON.stringify({
      token: JSON.parse(localStorage.getItem("token")),
      swaps_ids: [id],
      action
    }))
      .then((res) => {
        console.log(res);
        if(res.data.success) setSwaps(swaps.filter(swap => swap.swap_id !== id));
        setShow(false);
      })
  }

  return (
    <Container>
      <Row>
      <select onChange={(e) => handleChange(e)} class="form-select mb-3" >
        <option value="pending">en attente</option>
        <option value="accepted">acceptées</option>
      </select>
      </Row>
      <Row>
        {swaps && swaps.map((home) => (
          <Col style={{position: "relative"}} key={home.accommodation_id} sm={6} md={4} lg={4}>
            <Card
              className="mb-3"
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Img className="mb-3" variant="top" onClick={() => navigate(`/accommodations/${home.accommodation_id}`)} src={"http://localhost:8383/projet-home-swap/server4/" + home.media.file_path} />
                <Card.Title className="mb-3" >{home.address}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {home.type_name} - {home.city_name}
                </Card.Subtitle>
                <Card.Subtitle className="text-primary fs-5 mb-4">
                  +{home.cost} p
                </Card.Subtitle>
                <Card.Subtitle className="text-primary fs-6">
                  <Link to={`/user/${home.renter_id}`} style={{textDecoration: "none"}} >Consultez les commentaires sur le demandeur <FiExternalLink style={{fontSize: "1.2rem"}} /></Link>
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer style={{display: "flex", gap: "1.25rem"}} >
                <small className="text-muted">{home.start_date} - {home.end_date}</small>
                {state === 'pending' && <button  className="btn btn-primary" onClick={() => handleClick(home.swap_id, "accept")} style={{fontSize: ".75rem", padding: ".5rem"}} >Accepter</button>}
                {state === 'pending' && <button onClick={() => setShow(true)} className="btn btn-danger" style={{fontSize: ".75rem", padding: ".5rem"}} >Refuser</button>}
                <AlertModal show={show} handleClose={() => setShow(false)} title="Alerte" handleClick={() => handleClick(home.swap_id, "refuse")} body="Vous allez annuler la demande." clickText="Confirmer" />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default UserReceivedSwaps