import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { APIBASEURL } from '../helpers/sharedVariables';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
const MemberAccommodations = () => {
  const [accommodations, setAccommodations] = useState(null);
  const [state, setState] = useState("pending");

  const user = useSelector(state => selectUser(state));
  useEffect(() => {
    const getAccommodations = async () => {
      await axios.post(APIBASEURL + "get_accommodations_by_member_id.php", JSON.stringify({
        token: JSON.parse(localStorage.getItem("token")),
        member_id: user.member_id,
        state
      }))
      .then((res) => {
        setAccommodations(res.data.accommodations)
      })
      .catch(e => console.log(e))
    }
    getAccommodations();
  }, [state])
  const navigate = useNavigate()
  const handleChange = (e) => {
    setState(e.target.value);
  }
  // cancel sent swap function
  const [show, setShow] = useState(false);
  
  async  function handleDelete(id) {
    await axios.post(APIBASEURL + "delete_acco.php", JSON.stringify({
      token: JSON.parse(localStorage.getItem("token")),
      accommodation_id: id
    }))
      .then((res) => {
        console.log(res);
        if(res.data.success) setAccommodations(accommodations.filter(swap => swap.accommodation_id !== id));
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
        {accommodations && accommodations.map((home) => (
          <Col style={{position: "relative"}} key={home.accommodation_id} sm={6} md={4} lg={3}>
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
                <Card.Subtitle className="text-primary fs-5">
                  {home.value} p/nuit
                </Card.Subtitle>
              </Card.Body>
              {state === "pending" && <Card.Footer style={{display: "flex", gap: "1rem"}} >
                <button onClick={() => setShow(true)} className="btn btn-danger" style={{fontSize: ".75rem", padding: ".5rem"}} >{state === 'pending' ? "Annuler" : "Supprimer"}</button>
                <AlertModal show={show} handleClose={() => setShow(false)} title="Alerte" handleClick={() => handleDelete(home.accommodation_id)} body="Vous allez annuler votre demande d'ajout du bien." clickText="Confirmer" />
              </Card.Footer>}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default MemberAccommodations