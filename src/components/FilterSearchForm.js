import { useEffect, useState } from 'react';
import {HiSearchCircle} from 'react-icons/hi';
import {IoIosSwap} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { APIBASEURL } from '../helpers/sharedVariables';
import axios from 'axios';

  function FilterSearchForm({swapSearch, handleChange}) {
    const navigate = useNavigate();

    const getTodayDate = () => {
      const date = new Date();

      const year = date.getFullYear();

      const month = String(date.getMonth() + 1).padStart(2, '0');

      const day = String(date.getDate()).padStart(2, '0');

      const dateString = [year, month, day].join('-');

      return dateString;
    }

    function search(e) {
      e.preventDefault();

      navigate(`/search/results/${swapSearch.city_id ? swapSearch.city_id : 'undefined'}/${swapSearch.type ? swapSearch.type : "undefined"}/${swapSearch.start_date ? swapSearch.start_date : "undefined"}/${swapSearch.end_date ? swapSearch.end_date : "undefined"}`);
    }

    const apiBaseURL = 'http://localhost:8383/projet-home-swap/server_last/'

    const [cities, setCities] = useState([]);

    const [error, setError] = useState(null);

    const [types, setTypes] = useState([]);

    const getTypes = async () => {
      await axios.get(APIBASEURL + '/get_accommodations_types.php')
        .then((res) => {
          setTypes(res.data.accommodations_types);
        })
    }

    useEffect(() => {
      fetch(APIBASEURL + 'get_cities.php')
              .then(res => res.json())
              .then(data => {
                setCities(data.cities)
              })
              .catch((e) => {
                  setError(e.message);
              });
        getTypes();
    }, [])

    return (
      <form onSubmit={(e) => search(e)} className="d-inline-flex align-items-center rounded-pill border overflow-hidden p-2 mb-3" >
        <select name="city_id" value={swapSearch.city_id} onChange={(e) => handleChange(e)} className="border-0" style={{border: "none", outline: "none"}} >
            <option value="">Where to?</option>
            {
              cities.map(city => (
                <option value={city.city_id}>{city.city_name}</option>
              ))
            }
        </select>
        <select name="type" value={swapSearch.type} onChange={(e) => handleChange(e)} className="border-0" style={{border: "none", outline: "none"}} >
            <option value="">type</option>
            {
              types.map(type => <option value={type}>{type}</option> )
            }
        </select>
        <input name="start_date" value={swapSearch.start_date} onChange={(e) => handleChange(e)} min={getTodayDate()} max={swapSearch.end_date} className="border-0 me-1" type="date" />
        <input name="end_date" value={swapSearch.end_date} onChange={(e) => handleChange(e)} min={swapSearch.start_date} className="border-0 me-1" type="date" />
        <HiSearchCircle onClick={(e) => search(e)} className="fs-2 text-primary" />
      </form>
    )
}

export default FilterSearchForm;