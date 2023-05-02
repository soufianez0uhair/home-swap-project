import {HiSearchCircle} from 'react-icons/hi';

import { useNavigate } from 'react-router-dom';

  function RentSearchForm({rentSearch, handleChange}) {
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

      navigate(`/search/results/${false}/""/${rentSearch.targetedCity}/${rentSearch.startDate}/${rentSearch.endDate}`);
    }

    return (
      <form onSubmit={(e) => search(e)} className="d-flex align-items-center rounded-pill border overflow-hidden p-2" >
        <input name="targetedCity" value={rentSearch.targetedCity} onChange={(e) => handleChange(e)} className="border-0" style={{width: '9rem', border: "none", outline: "none"}} type="text" placeholder="Where to?" />
        <input name="startDate" value={rentSearch.startDate} onChange={(e) => handleChange(e)} min={getTodayDate()} max={rentSearch.endDate} className="border-0 me-1" type="date" />
        <input name="endDate" value={rentSearch.endDate} onChange={(e) => handleChange(e)} min={rentSearch.startDate} className="border-0 me-1" type="date" />
        <HiSearchCircle className="fs-2 text-primary" />
      </form>
    )
}

export default RentSearchForm;