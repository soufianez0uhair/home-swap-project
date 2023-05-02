import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SwapSearchForm from "../components/SwapSearchForm";
import FilterSearchForm from "../components/FilterSearchForm";

function SearchResults() {
  const [accommodations, setAccommodations] = useState([]);

  const [error, setError] = useState(null);

  const params = useParams();

  const paramsKeys = Object.keys(params);

  for(let i = 0; i < paramsKeys.length; i++) {
    if(params[paramsKeys[i]] === 'null') {
      params[paramsKeys[i]] = '';
    }
  }

  const [filters, setFilters] = useState({...params, isSwap: Boolean(params.isSwap)});

  const getAccommodations = async () => {
    await axios.post('https://homeswaper2023.000webhostapp.com/get_accommodations.php', filters)
      .then(res => setAccommodations(res.data))
      .catch((e) => setError({...error, 'fetchingError': e.message}))
  }

  return (
    <div style={{paddingTop: '7rem'}} className="px-4" >
      <FilterSearchForm filters={filters} setFilters={setFilters} />
    </div>
  )
}

export default SearchResults;