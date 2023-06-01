import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Badge } from "react-bootstrap";
import axios from 'axios';
import { APIBASEURL } from '../helpers/sharedVariables';
import {RxDimensions} from 'react-icons/rx';
import {MdMeetingRoom} from 'react-icons/md';
import {IoBed} from 'react-icons/io5';
import HomeDescriptionEl from '../components/HomeDescriptionEl';
import HomeSwapRentForm from '../components/HomeSwapRentForm';

function AccommodationPage() {
  const { id } = useParams(); // Assuming you have a route parameter for the accommodation ID
  
  const [accommodation, setAccommodation] = useState(null);
  const [error, setError] = useState(null);
  // Fetch the accommodation data based on the ID or use any other method to retrieve the data
  const getAccommodationById = async () => {
    await axios.post(APIBASEURL + 'get_accommodation_by_id.php', JSON.stringify({accommodation_id: Number(id)}))
      .then(res => {
        console.log(res);
        setAccommodation(res.data.accommodation_data);
      })
      .catch((e) => setError({...error, 'fetchingError': e.message}))
  }
  /* const getAccommodationById = async () => {
    await axios.get(APIBASEURL + 'get_accommodation_by_id.php', {
        params: {
          accommodation_id: Number(id)
        }
      })
      .then(res => {
        console.log(res);
        setAccommodation(res.data.accommodation_data);
      })
      .catch((e) => setError({...error, 'fetchingError': e.message}))
  } */
  
  useEffect(() => {
    getAccommodationById();
  }, [])
  console.log(error);
  // Example accommodation data
  const [accoAmenities, setAccoAmenities] = useState(null);
  useEffect(() => {
    if(accommodation && accommodation.amenities) {
      setAccoAmenities(accommodation.amenities.split(','));
    }
  }, [accommodation]);

  const amenities = [{name: "Wifi"}, {name: "Washing machine"}, {name: "Pool"}, {name: "Garden"}, {name: "Netflix"}, {name: "Dishwasher"}, {name: "Car swap"}, {name: "TV"}, {name: "Cigarette"}, {name: "Domesticated animals"}, {name: "Plants"}, {name: "Air Conditioner"}];

  console.log(accommodation);

  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(APIBASEURL + 'get_cities.php')
              .then(res => res.json())
              .then(data => {
                setCities(data.cities)
              })
              .catch((e) => {
                  setError(e.message);
              });
    }, [])

    const [city, setCity] = useState(null);

    useEffect(() => {
      if(cities && accommodation && cities.length > 0) {
        setCity(cities.find(city => city.city_id === accommodation.city_id).name);
      }
    }, [cities, accommodation])
    
  return (
    <>
      {accommodation && <div className="container" style={{marginTop: '7rem'}}>
      <div className="row AccommodationPage__img">
        <img src={APIBASEURL + accommodation.media[Math.floor(Math.random() * accommodation.media.length)]} className="col-12" alt="" />
      </div>
      <div className="row mt-4" >
        <div className="col-md-8" style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
          <h2>{accommodation.title} - {city}</h2>
          <h4>Description</h4>
          <p>{accommodation.description}</p>
          
          <h4>Adresse - {accommodation.adress}</h4>
          <h3>Qu'est ce que vous allez trouver?</h3>
          <div className="HomeDescription mb-3">
            <HomeDescriptionEl name="Dimension" value={accommodation.dimension} icon={RxDimensions} />
            <HomeDescriptionEl name="Chambre" value={accommodation.rooms_number} icon={MdMeetingRoom} />
            <HomeDescriptionEl name="Lit" value={accommodation.beds_number} icon={IoBed} />
            <HomeDescriptionEl name="Dimension" value={accommodation.dimension} icon={RxDimensions} />
          </div>
          <h4>Amenities</h4>
          <div className="AmenitiesList">
            {accoAmenities &&
              amenities.map(amenity => (
                <span key={amenity.name} className="mr-2">
              {accoAmenities.includes(amenity.name) ? (
                <Badge bg="success" pill variant="light">{amenity.name}</Badge>
              ) : (
                <Badge bg="secondary" pill variant="light">{amenity.name}</Badge>
              )}
            </span>
              ))
            }
          </div>
        </div>
        <div className="col-md-4">
          {accommodation && <HomeSwapRentForm purpose={accommodation.purpose} accommodation_id={accommodation.accommodation_id} points={accommodation.points} />}
        </div>
      </div>
    </div>}
    </>
  );
};

export default AccommodationPage;