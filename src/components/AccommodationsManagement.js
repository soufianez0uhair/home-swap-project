import React, { useState, useEffect } from 'react'
import ManagementFilter from './ManagementFilter'
import InactiveUsers from './InactiveUsers';
import axios from 'axios';
import {APIBASEURL} from '../helpers/sharedVariables';
import {selectAdmin} from '../redux/adminSlice';
import {useSelector} from 'react-redux';
import UsersByFeedback from './UsersByFeedback';
import PendingAccommodations from './PendingAccommodations';
import AccommodationsByFeedback from './AccommodationsByFeedback';

const AccommodationsManagement = () => {
  const options = ['pending', 'by feedback'];

  const [option, setOption] = useState('pending');

  const [selectedIds, setSelectedIds] = useState([]);

  const [accommodations, setAccommodations] = useState({
    pending_accommodations: []
  });

  const admin = useSelector(state => selectAdmin(state));

  const getPendingAccos = async () => {
    await axios.post(APIBASEURL + 'get_pending_accommodations.php', JSON.stringify({
      email: admin.email,
      password: admin.password,
      seen_ids: accommodations.pending_accommodations.map(user => user.user_id)
    }))
    .then(res => {
      setAccommodations({
        pending_accommodations: [...accommodations.pending_accommodations, ...res.data.pending_accommodations],
          total: Number(res.data.total)
        });
      })
    .then((e) => console.log(e)) }
    
    const [accommodationsFeedback, setAccommodationsFeedback] = useState({
      feedbacks: []
    });

    const getAccosFeedbacks = async () => {
      await axios.post(APIBASEURL + 'get_users_feedbacks.php', JSON.stringify({
        email: admin.email,
        password: admin.password,
        seen_ids: accommodationsFeedback.feedbacks.map(feedback => feedback.feedback_id)
      }))
      .then(res => {
          console.log(res);
          setAccommodationsFeedback({
            feedbacks: [...accommodationsFeedback.feedbacks, ...res.data.feedbacks],
            total: Number(res.data.total)
          });
        })
      .then((e) => console.log(e)) }
  
  useEffect(() => {
    getPendingAccos()
    getAccosFeedbacks()
  }, []);

  return (
    <div className="UserManagement">
      <div className="UserManagement__button">
        <ManagementFilter options={options} setOption={setOption} />
      </div>
      {option === 'pending' ? <PendingAccommodations accommodations={accommodations.pending_accommodations} /> : <AccommodationsByFeedback feedbacks={accommodationsFeedback.feedbacks} />}
      <div className="UserManagement__buttons">
        {(option === 'inactive users' ? accommodations.inactive_users.length > 0 && accommodations.inactive_users.length < accommodations.total : accommodationsFeedback.feedbacks.length > 0 && accommodationsFeedback.feedbacks.length < accommodationsFeedback.total) && <button onClick={() => {option === 'inactive users' ? getPendingAccos() : getAccosFeedbacks()}} type="button" class="btn btn-primary UserManagement__buttons__showmore" >Show more</button>}
        <button type="button" class="btn btn-primary UserManagement__buttons__action" >Apply actions</button>
      </div>
    </div>
  )
}

export default AccommodationsManagement