import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomeList = ({ homes }) => {
  const navigate = useNavigate();
  console.log(homes);
  return (
    <Container>
      <Row>
        {homes.map((home) => (
          <Col key={home.accommodation_id} sm={6} md={4} lg={3}>
            <Card
              className="mb-3"
              onClick={() => navigate(`/accommodations/${home.accommodation_id}`)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <Card.Img className="mb-3" variant="top" src={"http://localhost:8383/projet-home-swap/server4/" + home.media[0]} />
                <Card.Title className="mb-3" >{home.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {home.type_name}
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{home.address} {home.city_name}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeList;