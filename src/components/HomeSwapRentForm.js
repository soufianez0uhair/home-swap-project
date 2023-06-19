import { useEffect, useState } from "react";
import SwitchButton from "./SwitchButton";
import { Form } from "react-bootstrap";
import axios from "axios";
import { APIBASEURL } from "../helpers/sharedVariables";
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/datepicker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function HomeSwapRentForm({points, swaps, accommodation_id, handleShow}) {
  const [request, setRequest] = useState({
    accommodation_id: Number(accommodation_id),
    start_date: null,
    end_date: null,
    token: JSON.parse(localStorage.getItem('token'))
  });

  const [datesObj, setDatesObj] = useState(null);

  useEffect(() => {
    const newDatesObj = [];
    for(let i = 0; i < swaps.length; i++) {
      newDatesObj[i] = {start: new Date(swaps[i].start_date), end: new Date(swaps[i].end_date)};
    }
    setDatesObj(newDatesObj);
  }, [swaps])

  const [cost, setCost] = useState(points);

  const changeStartDate = (date) => {
    if(request.end_date && date) {
      let timeDiff = request.end_date.getTime() - date.getTime();
      setCost(points * (Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1));
    }
    setRequest({
      ...request,
      start_date: date
    })
  }

  const changeEndDate = (date) => {
    if(request.start_date && date) {
      let timeDiff = date.getTime() - request.start_date.getTime();
      setCost(points * (Math.ceil(timeDiff / (1000 * 3600 * 24))+ 1) );
    }
    setRequest({
      ...request,
      end_date: date
    })
  }

  const [error, setError] = useState({
    start_date: null,
    end_date: null,
    
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const user = useSelector(state => selectUser(state));

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      handleShow("not_authentified");
    }
    if(!request.start_date) {
      setError({
        ...error,
        start_date: 'Please select a start date'
      })
    } else if(!request.end_date) {
      setError({
        ...error,
        end_date: 'Please select an end date'
      })
    } else {
      await axios.post(APIBASEURL + 'swap[1].php',JSON.stringify({
        ...request,
        start_date: request.start_date.toISOString().substring(0, 10),
        end_date: request.end_date.toISOString().substring(0, 10)
      }))
        .then(res => {

          if(res.data.error) {
            setError(res.data.error)
          } else {
            if(res.data.success) navigate("/user/dashboard");
          }
        })
        .catch(e => console.log(e))
    }
  }
  useEffect(() => {
    if(error.balance_error) handleShow({reason: "balance_error", message: error.balance_error});
  }, [error])
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="HomeSwapRentForm">
      <div className="HomeSwapRentForm__button">
      </div>
      {points && <h3 className="HomeSwapRentForm__points mb-4 text-primary">{cost} <span>points/nuit</span></h3>}
      <div className="HomeSwapRentForm__group">
        <DatePicker
          onChange={date => changeStartDate(date)}
          selected={request.start_date}
          minDate={new Date()}
          maxDate={request.end_date}
          name="start_date"
          excludeDateIntervals={datesObj}
          placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
        />
        <DatePicker
          selected={null || request.end_date}
          onChange={date => changeEndDate(date)}
          minDate={request.start_date || new Date()}
          maxDate={datesObj && datesObj.length > 0 ? datesObj.find(date => date.start > request.start_date) : null}
          name="end_date"
          excludeDateIntervals={datesObj}
          placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
        />
      </div>
      <div className="HomeSwapRentForm__button">
        <button class="btn btn-primary" >Ask for a swap</button>
      </div>
    </form>
  )
}

export default HomeSwapRentForm;