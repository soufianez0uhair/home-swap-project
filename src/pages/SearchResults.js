import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from '../assets/gifs/spinner.gif';
import FilterSearchForm from "../components/FilterSearchForm";
import HomeList from "../components/HomeList";
import { APIBASEURL } from "../helpers/sharedVariables";

function SearchResults() {
  const [accommodations, setAccommodations] = useState(null)

  const [error, setError] = useState(null);

  const params = useParams();

  const paramsKeys = Object.keys(params);

  for(let i = 0; i < paramsKeys.length; i++) {
    if(params[paramsKeys[i]] === 'undefined') {
      params[paramsKeys[i]] = '';
    }
  }

  const [filters, setFilters] = useState({...params, city_id: params.city_id !== "undefined" ? Number(params.city_id) : '', type_name: params.type_name !== "undefined" ? params.type_name : "", start_date: params.start_date !== "undefined" ? params.start_date : "", end_date: params.end_date !== "undefined" ? params.end_date : "", amenities: [], seen_ids: []});

  console.log(accommodations, error);

  useEffect(() => {
    setAccommodations(null);
    const getAccommodations = async () => {
      await axios.post(APIBASEURL + 'get_accommodations.php', JSON.stringify(filters))
        .then(res => {
          console.log(res);
          setAccommodations(res.data.accommodations)})
        .catch((e) => setError({...error, 'fetchingError': e.message}))
    }
    getAccommodations();
  }, [filters])

  function handleChange(e) {
    let {name, value} = e.target;

    value = name === 'city_id' && value ? Number(value) : value; 

    setFilters({
      ...filters,
      [name]: value
    })
  }

  return (
    <div style={{paddingTop: '7rem'}} className="px-4" >
      <FilterSearchForm swapSearch={filters} handleChange={handleChange}  />
      {accommodations ? <HomeList homes={accommodations} /> : <img src={Spinner} alt="" style={{width: '20rem', marginTop: '25vh'}} /> }
    </div>
  )
}

export default SearchResults;