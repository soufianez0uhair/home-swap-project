import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FilterSearchForm from "../components/FilterSearchForm";
import HomeList from "../components/HomeList";

function SearchResults() {
  const [accommodations, setAccommodations] = useState(null)

  const [error, setError] = useState(null);

  const params = useParams();

  const paramsKeys = Object.keys(params);

  for(let i = 0; i < paramsKeys.length; i++) {
    if(params[paramsKeys[i]] === 'null') {
      params[paramsKeys[i]] = '';
    }
  }

  const [filters, setFilters] = useState({...params, targeted_city_id: Number(params.targeted_city_id), original_city_id: Number(params.original_city_id), purpose: params.purpose, type: 'villa', amenities: [], seen_accommodations: []});

  const apiBaseURL = 'http://localhost:8383/projet-home-swap/server_last/';

  const getAccommodations = async () => {
    await axios.post(apiBaseURL + 'get_accommodation.php', filters)
      .then(res => setAccommodations(res.data))
      .catch((e) => setError({...error, 'fetchingError': e.message}))
  }

  const submitForm = async () => {
    await axios.post(apiBaseURL + 'get_accommodation.php', filters, {
      headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then(res => {
        setAccommodations(res.data.accommodations_to_show)
        // handle successful response here
      })
      .catch(error => {
        console.error(error);
        // handle error response here
      });
  }

  useEffect(() => {
    submitForm();
    console.log(1);
  }, [filters])

  function handleChange(e) {
    let {name, value} = e.target;

    value = name === 'original_city_id' || name === 'targeted_city_id' ? Number(value) : value; 

    setFilters({
      ...filters,
      [name]: value
    })
  }

  console.log(filters);

  return (
    <div style={{paddingTop: '7rem'}} className="px-4" >
      <FilterSearchForm swapSearch={filters} handleChange={handleChange}  />
      {accommodations && <HomeList homes={accommodations} />}
    </div>
  )
}

export default SearchResults;