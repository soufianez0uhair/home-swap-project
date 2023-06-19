import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from "react-bootstrap";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { APIBASEURL } from '../helpers/sharedVariables';
import {RxDimensions} from 'react-icons/rx';
import {MdMeetingRoom, MdBathroom} from 'react-icons/md';
import {IoBed} from 'react-icons/io5';
import HomeDescriptionEl from '../components/HomeDescriptionEl';
import HomeSwapRentForm from '../components/HomeSwapRentForm';
import Testimonials from "../components/Testimonials";
import AlertModal from "../components/AlertModal";
import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

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
    
    const [show, setShow] = useState({
      reason: "",
      message: ""
    });

    const handleShow = (newShow) => {
      setShow(newShow)};
    const handleClose = () => setShow({reason: '', message: ''});
    const user = useSelector(state => selectUser(state));
    console.log(show)
  return (
    <>
      {accommodation && <div>
        <div className="container" style={{marginTop: '7rem'}}>
      <h2 style={{marginBottom: "1rem"}} >{accommodation.characteristics.title} - {city}</h2>
      <div className="AccommodationPage__img">
            <Carousel autoPlay infiniteLoop >
              {
                accommodation && accommodation.media.map(media => (
                  <div>
                    {accommodation && <img style={{height: "100%"}} src={APIBASEURL + media.file_path} />}
                  </div>
                ))
              }
            </Carousel>
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
          {accommodation && <HomeSwapRentForm handleShow={handleShow} swaps={accommodation.availability.swaps} accommodation_id={id} points={accommodation.characteristics.value} />}
        </div>
        <div className="col-12">
          <Testimonials />
        </div>
      </div>
    </div>
    {user && accommodation && <AlertModal  action={{link: "/points/buy", name: "Achetez des points"}} title="Points insuffisants!" body={show.message} handleClose={handleClose} show={show.reason === "balance_error"} />}
    <AlertModal handleShow={handleShow} action={{link: "/user/signup", name: "S'inscrire"}} title="Vous devez se connecter!" body={"Vous pouvez pas faire du swap sans avoir un compte."} handleClose={handleClose} show={show.reason === "not_authentified"} />

        </div>}
    </>
  );
};

export default AccommodationPage;