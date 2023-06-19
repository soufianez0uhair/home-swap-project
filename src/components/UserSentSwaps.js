import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { APIBASEURL } from '../helpers/sharedVariables';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';
const UserSentSwaps = () => {
  const [swaps, setSwaps] = useState(null);
  const [state, setState] = useState("pending");
  useEffect(() => {
    const getSwaps = async () => {
      await axios.post(APIBASEURL + "get_swaps_by_member_id.php", JSON.stringify({
        token: JSON.parse(localStorage.getItem("token")),
        state
      }))
      .then((res) => {
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
  
  async  function handleClick(id) {
    await axios.post(APIBASEURL + "cancel_sent_swap.php", JSON.stringify({
      token: JSON.parse(localStorage.getItem("token")),
      accommodation_id: id
    }))
      .then((res) => {
        if(res.data.success) setSwaps(swaps.filter(swap => swap.accommodation_id !== parseInt(id)));
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
          <Col style={{position: "relative"}} key={home.accommodation_id} sm={6} md={4} lg={3}>
            <Card
              className="mb-3"
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Img className="mb-3" variant="top" onClick={() => navigate(`/accommodations/${home.accommodation_id}`)} src={"http://localhost:8383/projet-home-swap/server4/" + home.infos.media.file_path} />
                <Card.Title className="mb-3" >{home.infos.address}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  {home.infos.type_name} - {home.infos.city_name}
                </Card.Subtitle>
                <Card.Subtitle className="text-primary fs-5">
                  {home.cost} p
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer style={{display: "flex", gap: "1rem"}} >
                <small className="text-muted">{home.start_date} - {home.end_date}</small>
                {state === 'pending' && <button onClick={() => setShow(true)} className="btn btn-danger" style={{fontSize: ".75rem", padding: ".5rem"}} >Annuler</button>}
                <AlertModal show={show} handleClose={() => setShow(false)} title="Alerte" handleClick={() => handleClick(home.accommodation_id)} body="Vous allez annuler votre demande." clickText="Confirmer" />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default UserSentSwaps