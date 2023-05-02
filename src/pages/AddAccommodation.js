import { useEffect, useState } from "react"
import axios from 'axios';

import Multiselect from 'multiselect-react-dropdown';

function AddAccommodation() {
  const apiBaseURL = 'https://homeswaper2023.000webhostapp.com/';

  const [types, setTypes] = useState([]);

  const getTypes = async () => {
    await axios.get(apiBaseURL + '/types')
      .then((res) => {
        setTypes(res.data.types);
      })
  }

  const amenities = [{name: "Wifi"}, {name: "Washing machine"}, {name: "Pool"}, {name: "Garden"}, {name: "Netflix"}, {name: "Dishwasher"}, {name: "Car swap"}, {name: "TV"}, {name: "Cigarette"}, {name: "Domesticated animals"}, {name: "Plants"}, {name: "Air Conditioner"}];

  useEffect(() => {
    // getTypes();
  })

  const [accommodation, setAccommodation] = useState({
    type_id: null,
    title: '',
    description: '',
    size: '',
    city: '',
    address: '',
    rooms_number: null,
    beds_number: null,
    floor: null,
    bathrooms_number: null,
    amenities: []
  });

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

  console.log(accommodation.amenities);
  return (
    <div class="container" style={{padding: "5rem 1rem 2rem 1rem"}} >
      <h2>Add an accommodation</h2>
      <form>
        <div class="form-group mb-3">
          <label for="title">Title:</label>
          <input type="text" class="form-control" id="title" placeholder="Enter title" />
        </div>
        <div className="form-group mb-3">
          <select class="form-select" id="type" placeholder="Enter type of accommodation" >
            <option value="">Please select the type of your accommodation</option>
            {
              types.map(type => (
                <option value={type.id}>{type.name}</option>
              ))
            }
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="description">Description:</label>
          <textarea class="form-control" id="description" placeholder="Enter description"></textarea>
        </div>
        <div class="form-group mb-3">
          <label for="size">Size:</label>
          <input type="text" class="form-control" id="size" placeholder="Enter size" />
        </div>
        <div class="form-group mb-3">
          <label for="city">City:</label>
          <input type="text" class="form-control" id="city" placeholder="Enter city" />
        </div>
        <div class="form-group mb-3">
          <label for="address">Address:</label>
          <input type="text" class="form-control" id="address" placeholder="Enter address" />
        </div>
        <div class="form-group mb-3">
          <label for="rooms">Rooms Number:</label>
          <input type="number" class="form-control" id="rooms" placeholder="Enter rooms number" />
        </div>
        <div class="form-group mb-3">
          <label for="beds">Beds Number:</label>
          <input type="number" class="form-control" id="beds" placeholder="Enter beds number" />
        </div>
        <div class="form-group mb-3">
          <label for="floor">Floor:</label>
          <input type="number" class="form-control" id="floor" placeholder="Enter floor" />
        </div>
        <div class="form-group mb-3">
          <label for="bathrooms">Bathrooms Number:</label>
          <input type="number" class="form-control" id="bathrooms" placeholder="Enter bathrooms number" />
        </div>
        <div className="form-group mb-3">
          <label for="bathrooms">Amenities:</label>
          <Multiselect
            displayValue="name"
            options={amenities}
            onKeyPressFn={function noRefCheck(){}}
            onSearch={function noRefCheck(){}}
            onSelect={(amenities, amenity) => addAmenity(amenity.name)}
            onRemove={(amenities, amenity) => removeAmenity(amenity.name)}
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddAccommodation