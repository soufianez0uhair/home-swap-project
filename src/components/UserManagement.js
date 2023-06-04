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

  const [s, ss] = useState({
    inactive_users: []
  });

  const admin = useSelector(state => selectAdmin(state));

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

  const [selectedUsers, setSelectedUsers] = useState({
    email: admin.email,
    password: admin.password,
    actions: []
  })

  useEffect(() => {
    setSelectedUsers({
      ...selectedUsers,
      actions: s.inactive_users.map(user => {return {user_id: user.user_id, action: 'activate', checked: false}})
    })
  }, [s])

  function handleAction(e, user_id) {
    if(e.target.name === 'checkbox') {
          let i = 0;
          while(selectedUsers.actions[i].user_id !== user_id) {
            i++;
          }
          const actions = selectedUsers.actions;
          actions[i] = {...selectedUsers.actions[i], checked: e.target.checked ? true : false}
          setSelectedUsers({
            ...selectedUsers,
            actions
          })
    } else if(e.target.name === "checkAll") {
      if(e.target.checked) {
        const actions = selectedUsers.actions.map(user => {return {...user, checked: true}});
        setSelectedUsers({
          ...selectedUsers,
          actions
        })
      } else {
        const actions = selectedUsers.actions.map(user => {return {...user, checked: false}});
        setSelectedUsers({
          ...selectedUsers,
          actions
        })
      }
    } else {
      let i = 0;
          while(selectedUsers.actions[i].user_id !== user_id) {
            i++;
          }
          const actions = selectedUsers.actions;
          actions[i] = {...selectedUsers.actions[i], action: e.target.value}
          setSelectedUsers({
            ...selectedUsers,
            actions
          })
    }
  }

  const actOnUsers = async () => {
    const checkedUsers = selectedUsers.actions.filter(user => user.checked === true)
    console.log(checkedUsers)
    await axios.post(APIBASEURL + 'act_on_users.php', JSON.stringify({
      ...selectedUsers,
      actions: checkedUsers
    }))
    .then(res => {
      console.log(res);
      if(res.data.state === "success") {
        const ids = checkedUsers.map(user => {return {user_id: user.user_id}});
        console.log(2, ids);
        console.log(s.inactive_users.filter(user => ids.indexOf({user_id: user.user_id}) !== -1))
        ss({
          ...s,
          inactive_users: s.inactive_users.filter(user => ids.indexOf({user_id: user.user_id}) !== -1)
        })
      }
    })
    .then((e) => console.log(e)) }

    console.log(selectedUsers)
  return (
    <div className="UserManagement">
      <div className="UserManagement__button">
        <ManagementFilter options={options} setOption={setOption} />
      </div>
      {option === 'inactive users' ? <InactiveUsers handleAction={handleAction} setInaUsers={ss} inaUsers={s.inactive_users} users={s} /> : <UsersByFeedback feedbacks={feedbackUsers.feedbacks} />}
      <div className="UserManagement__buttons">
        {(option === 'inactive users' ? s.inactive_users.length > 0 && s.inactive_users.length < s.total : feedbackUsers.feedbacks.length > 0 && feedbackUsers.feedbacks.length < feedbackUsers.total) && <button onClick={() => {option === 'inactive users' ? getInactiveUsers() : getUsersFeedbacks()}} type="button" class="btn btn-primary UserManagement__buttons__showmore" >Show more</button>}
        <button type="button" class="btn btn-primary UserManagement__buttons__action" onClick={actOnUsers} >Apply actions</button>
      </div>
    </div>
  )
}

export default UserManagement