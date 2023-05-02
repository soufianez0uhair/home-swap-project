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

      navigate(`/search/results/${true}/${swapSearch.originalCity ? swapSearch.originalCity : null}/${swapSearch.targetedCity ? swapSearch.targetedCity : null}/${swapSearch.startDate ? swapSearch.startDate : null}/${swapSearch.endDate ? swapSearch.endDate : null}`);
    }

    return (
      <form onSubmit={(e) => search(e)} className="d-flex align-items-center rounded-pill border overflow-hidden p-2" >
        <input name="originalCity" value={swapSearch.originalCity} onChange={(e) => handleChange(e)} className="border-0" style={{border: "none", outline: "none"}} type="text" placeholder="Where your home from?" />
        <IoIosSwap />
        <input name="targetedCity" value={swapSearch.targetedCity} onChange={(e) => handleChange(e)} className="border-0 ps-2" style={{width: '9rem', border: "none", outline: "none"}} type="text" placeholder="Where to?" />
        <input name="startDate" value={swapSearch.startDate} onChange={(e) => handleChange(e)} min={getTodayDate()} max={swapSearch.endDate} className="border-0 me-1" type="date" />
        <input name="endDate" value={swapSearch.endDate} onChange={(e) => handleChange(e)} min={swapSearch.startDate} className="border-0 me-1" type="date" />
        <HiSearchCircle onClick={(e) => search(e)} className="fs-2 text-primary" />
      </form>
    )
}

export default SwapSearchForm;