import React, { useState, useEffect } from 'react'
import ManagementFilter from './ManagementFilter'
import InactiveUsers from './InactiveUsers';
import axios from 'axios';
import {APIBASEURL} from '../helpers/sharedVariables';
import {selectAdmin} from '../redux/adminSlice';
import {useSelector} from 'react-redux';
import UsersByFeedback from './UsersByFeedback';

const UserManagement = () => {
  const options = ['inactive users', 'by feedback'];

  const [option, setOption] = useState('inactive users');

  const [selectedIds, setSelectedIds] = useState([]);

  const [inaUsers, setInaUsers] = useState([]);

  const [s, ss] = useState({
    inactive_users: []
  });

  const admin = useSelector(state => selectAdmin(state));

  const [total, setTotal] = useState(null);

  const getInactiveUsers = async () => {
    await axios.post(APIBASEURL + 'get_inactive_users.php', JSON.stringify({
      email: admin.email,
      password: admin.password,
      seen_ids: s.inactive_users.map(user => user.user_id)
    }))
    .then(res => {
        ss({
          inactive_users: [...s.inactive_users, ...res.data.inactive_users],
          total: Number(res.data.total)
        });
      })
    .then((e) => console.log(e)) }

    const [feedbackUsers, setFeedbackUsers] = useState({
      feedbacks: []
    });

    const getUsersFeedbacks = async () => {
      await axios.post(APIBASEURL + 'get_owners_feedbacks.php', JSON.stringify({
        email: admin.email,
        password: admin.password,
        seen_ids: feedbackUsers.feedbacks.map(feedback => feedback.feedback_id)
      }))
      .then(res => {
          console.log(res);
          setFeedbackUsers({
            feedbacks: [...feedbackUsers.feedbacks, ...res.data.feedbacks],
            total: Number(res.data.total)
          });
        })
      .then((e) => console.log(e)) }
  
  useEffect(() => {
    getInactiveUsers()
    getUsersFeedbacks()
  }, []);

  return (
    <div className="UserManagement">
      <div className="UserManagement__button">
        <ManagementFilter options={options} setOption={setOption} />
      </div>
      {option === 'inactive users' ? <InactiveUsers inaUsers={s.inactive_users} /> : <UsersByFeedback feedbacks={feedbackUsers.feedbacks} />}
      <div className="UserManagement__buttons">
        {(option === 'inactive users' ? s.inactive_users.length > 0 && s.inactive_users.length < s.total : feedbackUsers.feedbacks.length > 0 && feedbackUsers.feedbacks.length < feedbackUsers.total) && <button onClick={() => {option === 'inactive users' ? getInactiveUsers() : getUsersFeedbacks()}} type="button" class="btn btn-primary UserManagement__buttons__showmore" >Show more</button>}
        <button type="button" class="btn btn-primary UserManagement__buttons__action" >Apply actions</button>
      </div>
    </div>
  )
}

export default UserManagement