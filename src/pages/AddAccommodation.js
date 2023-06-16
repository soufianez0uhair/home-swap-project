import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Multiselect from 'multiselect-react-dropdown';
import { APIBASEURL } from "../helpers/sharedVariables";

function AddAccommodation() {
  const navigate = useNavigate();

  const [accommodation, setAccommodation] = useState({
    characteristics: {
      title: '',
      description: '',
      size: null, // 0
      city_id: null,
      address: '',
      rooms_number: null, // 0
      beds_number: null, // 0
      bathrooms_number: null, // 0
      type_name: null,
      latitude: 0,
      longitude: 0
    },
    amenities: [],
    images: null,
  });

  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    await axios.get(APIBASEURL + '/get_types.php')
      .then((res) => {
        setTypes(res.data.types);
      })
  }

  const [amenities, setAmenities] = useState(null)

  const getAmenities = async () => {
    await axios.get(APIBASEURL + '/get_amenities.php')
      .then((res) => {
        const amenities = [];
        for(let i = 0; i < res.data.amenities.length; i++) {
          amenities[i] = {name: res.data.amenities[i]};
        }
        setAmenities(amenities);
      })
  }
  
  useEffect(() => {
    getTypes();
    getAmenities();
  }, [])

  const addAmenity = (amenityName) => {
    setAccommodation({
      ...accommodation,
      amenities: [...accommodation.amenities, amenityName]
    })
  }

  const removeAmenity = (amenityName) => {
    setAccommodation({
      ...accommodation,
      amenities: accommodation.amenities.filter(amenity => amenity !== amenityName)
    })
  }

  function handleChange(e) {
    let {name, value} = e.target;

    if(name === 'size' || name === 'city_id' || name === 'rooms_number' || name === 'beds_number' || name === 'bathrooms_number') {
      value = Number(value);
    }

    if(name === 'images') {
      setAccommodation({
        ...accommodation,
        images: e.target.files
      })
    } else {
      setAccommodation({
        ...accommodation,
        characteristics: {...accommodation.characteristics, [name]: value}
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* const accommodationKeysArray = Object.keys(accommodation);
      let data = new FormData();
      for(let i = 0; i < accommodationKeysArray.length; i++) {
        if(accommodationKeysArray[i] !== "images") {
          data.append(accommodationKeysArray[i], accommodation[accommodationKeysArray[i]]);
        } else { // if(accommodationKeysArray[i] === "images") {
          for(let j = 0; j < accommodation.images.length; j++) {
            data.append("images[]", accommodation["images"][j]);
          }
      } else {
        for(let j = 0; j < accommodation.amenities.length; j++) {
          data.append("images[]", accommodation["amenities"][j]);
        }
      }
    } */
      await axios.post(APIBASEURL + 'add_accommodation.php', accommodation)
        .then(res => {
        // res = JSON.parse(res);
        const resObj = JSON.parse(JSON.stringify(res));
        console.log(res, resObj);
        if(resObj.data.error) {
          setError({
            ...resObj.data.error
          });
        }})
  }

  const submitForm = async (e, accommodation) => {
    e.preventDefault();
    await axios.post(APIBASEURL + 'add_accommodation.php', {
       // hardcoded for now, replace with your actual user ID
      characteristics: {title: accommodation.characteristics.title,
      type_name: accommodation.characteristics.type_name,
      description: accommodation.characteristics.description,
      latitude: accommodation.characteristics.latitude,
      longitude: accommodation.characteristics.longitude,
      city_id: accommodation.characteristics.city_id,
      address: accommodation.characteristics.address,
      rooms_number: accommodation.characteristics.rooms_number,
      beds_number: accommodation.characteristics.beds_number,
      bathrooms_number: accommodation.characteristics.bathrooms_number,
      size: accommodation.characteristics.size || 0,}, // set default value to 0 if null
      amenities: accommodation.amenities,
      images: accommodation.images,
      token: JSON.parse(localStorage.getItem('token'))
    }, {
      headers : {
          // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
          'Content-Type': 'multipart/form-data'
      }
  })
    .then(res => {
      console.log(res);
      console.log(res.data);
      // handle successful response here
    })
    .catch(error => {
      console.error(error);
      // handle error response here
    });
  }

  const [cities, setCities] = useState([]);

  const [error, setError] = useState(null);

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

  return (
    <div class="container" style={{padding: "5rem 1rem 2rem 1rem"}} >
      <h2>Ajouter un logement</h2>
      <form onSubmit={(e) => submitForm(e, accommodation)} >
        {error && <div className="text-danger">{error}</div> }
        <div class="form-group mb-3">
          <label for="title">Titre</label>
          <input value={accommodation.characteristics.title} onChange={(e) => handleChange(e)} name="title" type="text" class="form-control" id="title" placeholder="Entrez titre" />
        </div>
        <div className="form-group mb-3">
          <select value={accommodation.characteristics.type_name} onChange={(e) => handleChange(e)} name="type_name" class="form-select" id="type" >
            <option value="">Veuillez sélectionner le type de votre logement</option>
            {
              types.map(type => <option value={type.type_name}>{type.type_name}</option>)
            }
          </select>
        </div>
        <div className="form-group mb-3">
          <label for="images">Téléchargez les images de votre logement</label>
          <input files={accommodation.images} onChange={(e) => handleChange(e)} name="images" type="file" class="form-control" id="images" multiple/>
        </div>
        <div class="form-group mb-3">
          <label for="description">Description</label>
          <textarea value={accommodation.characteristics.description} onChange={(e) => handleChange(e)} name="description" class="form-control" id="description" placeholder="Entrez description"></textarea>
        </div>
        <div class="form-group mb-3">
          <label for="size">Taille</label>
          <input value={accommodation.characteristics.size} onChange={(e) => handleChange(e)} name="size" type="text" class="form-control" id="size" placeholder="Entrez la taille" />
        </div>
        <div className="form-group mb-3">
          <select value={accommodation.characteristics.city_id} onChange={(e) => handleChange(e)} name="city_id" class="form-select" id="city_id" >
            <option value="">Dans quelle ville est-ce logement?</option>
            {
              cities.map(city => (
                <option value={city.city_id}>{city.city_name}</option>
              ))
            }
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="address">Adresse</label>
          <input value={accommodation.characteristics.address} onChange={(e) => handleChange(e)} name="address" type="text" class="form-control" id="address" placeholder="Entrez l'adresse" />
        </div>
        <div class="form-group mb-3">
          <label for="rooms">Nombre de chambres</label>
          <input value={accommodation.characteristics.rooms_number} onChange={(e) => handleChange(e)} name="rooms_number" type="number" class="form-control" id="rooms" />
        </div>
        <div class="form-group mb-3">
          <label for="beds">Nombre de lits</label>
          <input value={accommodation.characteristics.beds_number} onChange={(e) => handleChange(e)} name="beds_number" type="number" class="form-control" id="beds" />
        </div>
        <div class="form-group mb-3">
          <label for="bathrooms">Nombre de toilettes</label>
          <input value={accommodation.characteristics.bathrooms_number} onChange={(e) => handleChange(e)} name="bathrooms_number" type="number" class="form-control" id="bathrooms" />
        </div>
        <div className="form-group mb-3">
          <label for="bathrooms">Amenities</label>
          {amenities && <Multiselect
            displayValue="name"
            options={amenities}
            onKeyPressFn={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={(amenities, amenity) => addAmenity(amenity.name)}
            onRemove={(amenities, amenity) => removeAmenity(amenity.name)}
          />}
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddAccommodation;