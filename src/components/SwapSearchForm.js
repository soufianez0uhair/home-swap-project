import { useEffect, useState } from 'react';
import {HiSearchCircle} from 'react-icons/hi';
import {IoIosSwap} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

  function SwapSearchForm({swapSearch, handleChange}) {
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

      navigate(`/search/results/${swapSearch.purpose}/${swapSearch.original_city_id ? swapSearch.original_city_id : 'undefined'}/${swapSearch.targeted_city_id ? swapSearch.targeted_city_id : 'undefined'}/${swapSearch.type ? swapSearch.type : "undefined"}/${swapSearch.startDate ? swapSearch.startDate : "undefined"}/${swapSearch.endDate ? swapSearch.endDate : "undefined"}`);
    }

    const apiBaseURL = 'http://localhost:8383/projet-home-swap/server_last/'

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
      <form onSubmit={(e) => search(e)} className="d-inline-flex align-items-center rounded-pill border overflow-hidden p-2 mb-3" >
        <select name="original_city_id" value={swapSearch.original_city_id} onChange={(e) => handleChange(e)} className="border-0" style={{border: "none", outline: "none"}} >
            <option value="">Where your home from?</option>
            {
              cities.map(city => (
                <option value={city.city_id}>{city.name}</option>
              ))
            }
        </select>
        <IoIosSwap />
        <select name="targeted_city_id" value={swapSearch.targeted_city_id} onChange={(e) => handleChange(e)} className="border-0" style={{border: "none", outline: "none"}} >
            <option value="">Where to?</option>
            {
              cities.map(city => (
                <option value={city.city_id}>{city.name}</option>
              ))
            }
        </select>
        <select name="type" value={swapSearch.type} onChange={(e) => handleChange(e)} className="border-0" style={{border: "none", outline: "none"}} >
            <option value="">type</option>
            <option value="studio">studio</option>
            <option value="villa">villa</option>
            <option value="apartment">apartment</option>
        </select>
        <input name="startDate" value={swapSearch.startDate} onChange={(e) => handleChange(e)} min={getTodayDate()} max={swapSearch.endDate} className="border-0 me-1" type="date" />
        <input name="endDate" value={swapSearch.endDate} onChange={(e) => handleChange(e)} min={swapSearch.startDate} className="border-0 me-1" type="date" />
        <HiSearchCircle onClick={(e) => search(e)} className="fs-2 text-primary" />
      </form>
    )
}

export default SwapSearchForm;