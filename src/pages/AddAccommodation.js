import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Multiselect from 'multiselect-react-dropdown';
import { APIBASEURL } from "../helpers/sharedVariables";

function AddAccommodation() {
  const navigate = useNavigate();

  const [accommodation, setAccommodation] = useState({
    title: '',
    description: '',
    size: null, // 0
    city_id: null,
    address: '',
    rooms_number: null, // 0
    beds_number: null, // 0
    floor: null, // ? 0
    bathrooms_number: null, // 0
    amenities: [],
    images: null,
    type: null,
    latitude: 0,
    longitude: 0
  });

  const apiBaseURL = 'http://localhost:8383/projet-home-swap/server_last/';

  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    await axios.get(APIBASEURL + '/get_accommodations_types.php')
      .then((res) => {
        setTypes(res.data.accommodations_types);
      })
  }

  const [amenities, setAmenities] = useState(null)

  const getAmenities = async () => {
    await axios.get(APIBASEURL + '/get_amenities.php')
      .then((res) => {
        setAmenities(res.data.amenities);
      })
  }

  console.log(accommodation);
  
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

    setAccommodation({
      ...accommodation,
      [name]: name === 'images' ? e.target.files : value
    })

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
      await axios.post(apiBaseURL + 'add_accommodation.php', accommodation)
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
      type: accommodation.type,
      title: accommodation.title,
      description: accommodation.description,
      latitude: accommodation.latitude,
      longitude: accommodation.longitude,
      city_id: accommodation.city_id,
      address: accommodation.address,
      rooms_number: accommodation.rooms_number,
      beds_number: accommodation.beds_number,
      floor: accommodation.floor || 0, // set default value to 0 if null
      bathrooms_number: accommodation.bathrooms_number,
      dimension: accommodation.dimension || 0, // set default value to 0 if null
      amenities: accommodation.amenities,
      purpose: accommodation.purpose || '', // set default value to empty string if null
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
      navigate('/');
    })
    .catch(error => {
      console.error(error);
      // handle error response here
    });
  }

  const [cities, setCities] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiBaseURL + 'get_cities.php')
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
      <h2>Add an accommodation</h2>
      <form onSubmit={(e) => submitForm(e, accommodation)} >
        {error && <div className="text-danger">{error}</div> }
        <div class="form-group mb-3">
          <label for="title">Title</label>
          <input value={accommodation.title} onChange={(e) => handleChange(e)} name="title" type="text" class="form-control" id="title" placeholder="Enter title" />
        </div>
        <div className="form-group mb-3">
          <select value={accommodation.type} onChange={(e) => handleChange(e)} name="type" class="form-select" id="type" >
            <option value="">Please select the type of your accommodation</option>
            {
              types.map(type => <option value={type}>{type}</option>)
            }
          </select>
        </div>
        <div className="form-group mb-3">
          <label for="images">Upload your accommodation images</label>
          <input files={accommodation.images} onChange={(e) => handleChange(e)} name="images" type="file" class="form-control" id="images" multiple/>
        </div>
        <div class="form-group mb-3">
          <label for="description">Description</label>
          <textarea value={accommodation.description} onChange={(e) => handleChange(e)} name="description" class="form-control" id="description" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group mb-3">
          <label for="size">Size</label>
          <input value={accommodation.size} onChange={(e) => handleChange(e)} name="size" type="text" class="form-control" id="size" placeholder="Enter size" />
        </div>
        <div className="form-group mb-3">
          <select value={accommodation.city_id} onChange={(e) => handleChange(e)} name="city_id" class="form-select" id="city_id" >
            <option value="">Which city is that {accommodation.type ? accommodation.type : 'accommodation'} in?</option>
            {
              cities.map(city => (
                <option value={city.city_id}>{city.name}</option>
              ))
            }
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="address">Address</label>
          <input value={accommodation.address} onChange={(e) => handleChange(e)} name="address" type="text" class="form-control" id="address" placeholder="Enter address" />
        </div>
        <div class="form-group mb-3">
          <label for="rooms">Rooms Number</label>
          <input value={accommodation.rooms_number} onChange={(e) => handleChange(e)} name="rooms_number" type="number" class="form-control" id="rooms" placeholder="Enter rooms number" />
        </div>
        <div class="form-group mb-3">
          <label for="beds">Beds Number</label>
          <input value={accommodation.beds_number} onChange={(e) => handleChange(e)} name="beds_number" type="number" class="form-control" id="beds" placeholder="Enter beds number" />
        </div>
        <div class="form-group mb-3">
          <label for="bathrooms">Bathrooms Number</label>
          <input value={accommodation.bathrooms_number} onChange={(e) => handleChange(e)} name="bathrooms_number" type="number" class="form-control" id="bathrooms" placeholder="Enter bathrooms number" />
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