import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomeList = ({ homes }) => {
  const [selectedHome, setSelectedHome] = useState(null);

  const handleClick = (home) => {
    setSelectedHome(home);
  };

  return (
    <Container>
      <Row>
        {homes.map((home) => (
          <Col key={home.accommodation_id} sm={6} md={4} lg={3}>
            <Card
              className="mb-3"
              onClick={() => handleClick(home)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Img className="mb-3" variant="top" src={"http://localhost:8383/projet-home-swap/server_last/" + home.media[0]} />
                <Card.Title className="mb-3" >{home.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {home.type}
                </Card.Subtitle>
                <Card.Text >{home.description.length > 90 ? home.description.slice(0, 90) + '...' : home.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{home.adress}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedHome && (
        <div className="mt-3">
          <h4>{selectedHome.title}</h4>
          <p>{selectedHome.description}</p>
          <p>City ID: {selectedHome.city_id}</p>
          <p>Type: {selectedHome.type}</p>
          <p>Purpose: {selectedHome.purpose}</p>
          <p>Rooms number: {selectedHome.rooms_number}</p>
          <p>Beds number: {selectedHome.beds_number}</p>
          <p>Bathrooms number: {selectedHome.bathrooms_number}</p>
          <p>Dimension: {selectedHome.dimension}</p>
          <p>Floor: {selectedHome.floor}</p>
          <p>Amenities: {selectedHome.amenities}</p>
        </div>
      )}
    </Container>
  );
};

export default HomeList;