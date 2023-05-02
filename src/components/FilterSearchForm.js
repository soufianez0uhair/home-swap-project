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
      <form className="form-group d-inline-flex align-items-center rounded-pill border overflow-hidden p-2" method="get">
  <div className="input-group">
    <input name="originalCity" className="form-control border-0" style={{border: "none", outline: "none"}} type="text" placeholder="Where your home from?" />
    <button className="input-group-text border-0" type="button"><i className="bi bi-arrow-right"></i></button>
    <input name="targetedCity" className="form-control border-0" style={{width: "9rem", border: "none", outline: "none"}} type="text" placeholder="Where to?" />
    <input name="startDate" className="form-control border-0" min={new Date().toISOString().split("T")[0]} max={new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString().split("T")[0]} type="date" />
    <input name="endDate" className="form-control border-0" min={new Date().toISOString().split("T")[0]} type="date" />
    <select className="form-select" multiple>
      <option>Apple</option>
      <option>Banana</option>
      <option>Orange</option>
      <option>Grape</option>
      <option>Strawberry</option>
    </select>
  </div>
  <button type="submit" className="btn btn-primary"><i className="bi bi-search"></i></button>
</form>

    )
}

export default FilterSearchForm;