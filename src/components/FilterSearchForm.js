import {HiSearchCircle} from 'react-icons/hi';
import {IoIosSwap} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

  function FilterSearchForm({filters, setFilters}) {

    const navigate = useNavigate();

    const getTodayDate = () => {
      const date = new Date();

      const year = date.getFullYear();

      const month = String(date.getMonth() + 1).padStart(2, '0');

      const day = String(date.getDate()).padStart(2, '0');

      const dateString = [year, month, day].join('-');

      return dateString;
    }

    const search = (e) => {
      e.preventDefault();

      navigate(`/search/results/${true}/${filters.originalCity ? filters.originalCity : null}/${filters.targetedCity ? filters.targetedCity : null}/${filters.startDate ? filters.startDate : null}/${filters.endDate ? filters.endDate : null}`);
    }

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFilters({
        ...filters,
        [name]: value
      })
    }

    return (
      <form className="form-group">
        <input type="text" className="form-input" placeholder="where your home from?" />
      </form>

    )
}

export default FilterSearchForm;