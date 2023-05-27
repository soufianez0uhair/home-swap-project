import { useEffect, useState } from "react";
import SwitchButton from "./SwitchButton";
import { Form } from "react-bootstrap";
import axios from "axios";
import { APIBASEURL } from "../helpers/sharedVariables";
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/datepicker';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function HomeSwapRentForm({points, purpose, accommodation_id, user_id}) {
  const [request, setRequest] = useState({
    accommodation_id,
    user_id,
    start_date: null,
    end_date: null,
    token: JSON.parse(localStorage.getItem('token'))
  });

  const [dates, setDates] = useState([{start_date: '2023-05-27', end_date: '2023-05-30'}]);

  const getDates = async () => {
    await axios.get(APIBASEURL + '', {accommodation_id: accommodation_id})
      .then((res) => {
        setDates(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getDates();
  }, [])

  const [datesObj, setDatesObj] = useState(null);

  useEffect(() => {
    const newDatesObj = [];
    for(let i = 0; i < dates.length; i++) {
      newDatesObj[i] = {start: new Date(dates[i].start_date), end: new Date(dates[i].end_date)};
    }
    setDatesObj(newDatesObj);
  }, [dates])

  const changeStartDate = (date) => {
    setRequest({
      ...request,
      start_date: date
    })
  }

  const changeEndDate = (date) => {
    setRequest({
      ...request,
      end_date: date
    })
  }

  const [error, setError] = useState({
    start_date: null,
    end_date: null
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      await axios.post(APIBASEURL + '',{
        ...request,
        start_date: request.start_date.toISOString().substring(0, 10),
        end_date: request.end_date.toISOString().substring(0, 10)
      })
        .then(res => {
          if(res.data.error) {
            setError(res.data.error)
          } else {
            setIsSuccess(true);
          }
        })
    }
  }

  return (
    <form className="HomeSwapRentForm">
      <div className="HomeSwapRentForm__button">
      </div>
      {points && <h1 className="HomeSwapRentForm__points text-primary">{points} <span>points/night</span></h1>}
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
          name="end_date"
          excludeDateIntervals={datesObj}
          placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
        />
      </div>
      <div className="HomeSwapRentForm__group">
        <button class="btn btn-primary" >Ask for a swap</button>
      </div>
    </form>
  )
}

export default HomeSwapRentForm;