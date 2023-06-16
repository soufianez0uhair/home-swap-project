import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Row, Col, Button, Badge } from "react-bootstrap";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { APIBASEURL } from '../helpers/sharedVariables';
import {RxDimensions} from 'react-icons/rx';
import {MdMeetingRoom, MdBathroom} from 'react-icons/md';
import {IoBed} from 'react-icons/io5';
import HomeDescriptionEl from '../components/HomeDescriptionEl';
import HomeSwapRentForm from '../components/HomeSwapRentForm';
import Testimonials from "../components/Testimonials";

function AccommodationPage() {
  const { id } = useParams(); // Assuming you have a route parameter for the accommodation ID
  
  const [accommodation, setAccommodation] = useState(null);
  const [error, setError] = useState(null);
  // Fetch the accommodation data based on the ID or use any other method to retrieve the data
  const getAccommodationById = async () => {
    await axios.post(APIBASEURL + 'get_accommodation_by_id.php', JSON.stringify({accommodation_id: Number(id)}))
      .then(res => {
        setAccommodation(res.data.accommodation);
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
  // Example accommodation data
  const [accoAmenities, setAccoAmenities] = useState(null);
  useEffect(() => {
    if(accommodation && accommodation.amenities) {
      setAccoAmenities(accommodation.amenities);
    }
  }, [accommodation]);

  const amenities = [
    { name: 'Climatiseur' },
    { name: 'Purificateur d\'air' },
    { name: 'Baignoire' },
    { name: 'Bidet' },
    { name: 'Mixeur' },
    { name: 'Machine à pain' },
    { name: 'Ventilateur de plafond' },
    { name: 'Cafetière' },
    { name: 'Congélateur' },
    { name: 'Égouttoir à vaisselle' },
    { name: 'Lave-vaisselle' },
    { name: 'Sèche-linge' },
    { name: 'Lecteur DVD' },
    { name: 'Filtre à eau' },
    { name: 'Wifi' },
    { name: 'Télévision' },
  { name: 'Grille-pain' },
  { name: 'Compacteur de déchets' },
  { name: 'Aspirateur' },
  ];
  
    
  console.log(accommodation);

  const [cities, setCities] = useState(null);

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
        console.log(cities);
        cities && setCity(cities.find(city => city.city_id === accommodation.characteristics.city_id).city_name);
      }
    }, [cities, accommodation])
    
  return (
    <>
      {accommodation && <div className="container" style={{marginTop: '7rem'}}>
      <h2 style={{marginBottom: "1rem"}} >{accommodation.characteristics.title} - {city}</h2>
      <div className="AccommodationPage__img">
            <Carousel autoPlay infiniteLoop >
                <div>
                    <img style={{height: "100%"}} src="https://storage.googleapis.com/listings-image/uploads/2023-05-23T120801-244Z-Appartement-3-chambres-GrandCasablanca-Settat-Hay-Hassani1684843674068-53ae4b82-4ca1-43ed-88d4-18d777ccc725-annonce-agenz.jpg" />
                </div>
                <div>
                    <img style={{height: "100%"}} src="https://storage.googleapis.com/listings-image/uploads/2023-05-23T120809-068Z-Appartement-3-chambres-GrandCasablanca-Settat-Hay-Hassani1684843674069-0df8dd95-2fb9-4be6-b293-0464e0a1ce41-annonce-agenz.jpg" />
                </div>
                <div>
                    <img style={{height: "100%"}} src="https://storage.googleapis.com/listings-image/uploads/2023-05-23T120804-648Z-Appartement-3-chambres-GrandCasablanca-Settat-Hay-Hassani1684843674070-7b364ac1-b16d-4cfc-a8cf-32ad115ebfaa-annonce-agenz.jpg" />
                </div>
            </Carousel>
        <img src={APIBASEURL + accommodation.media[Math.floor(Math.random() * accommodation.media.length)]} className="col-12" alt="" />
      </div>
      <div className="row mt-4" >
        <div className="col-md-8" style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
          <h4>Description</h4>
          <p>{accommodation.characteristics.description}</p>
          
          <h4>Adresse - {accommodation.characteristics.address}</h4>
          <h3>Qu'est ce que vous allez trouver?</h3>
          <div className="HomeDescription mb-3">
            <HomeDescriptionEl name="Dimension" value={accommodation.characteristics.size} icon={RxDimensions} />
            <HomeDescriptionEl name="Chambre" value={accommodation.characteristics.rooms_number} icon={MdMeetingRoom} />
            <HomeDescriptionEl name="Lit" value={accommodation.characteristics.beds_number} icon={IoBed} />
            <HomeDescriptionEl name="Toilette" value={accommodation.characteristics.bathrooms_number} icon={MdBathroom} />
          </div>
          <h4>Amenities</h4>
          <div className="AmenitiesList" style={{marginBottom: "1rem"}} >
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
          {accommodation && <HomeSwapRentForm purpose={accommodation.purpose} accommodation_id={accommodation.accommodation_id} points={accommodation.characteristics.value} />}
        </div>
        <div className="col-12">
          <Testimonials />
        </div>
      </div>
    </div>}
    </>
  );
};

export default AccommodationPage;