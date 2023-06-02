import { useState } from "react";
import { emailValidator } from "../helpers/validator";
import axios from "axios";
import {useDispatch} from 'react-redux';
import { auth } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import { APIBASEURL } from "../helpers/sharedVariables";

function AdminSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setAdmin({
      ...admin,
      [name]: value
    });
  };

  const [error, setError] = useState({
    email: '',
    password: '',
    allFields: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if(!admin.email || !admin.password) {
      setError({
        email: '',
        password: '',
        allFields: 'Please fill in all the fields.'
      })
    } else if(!emailValidator(admin.email)) {
      setError({
        email: 'Please use a valid email.',
        password: '',
        allfields: ''
      })
    } else {
      const apiBaseURL = 'http://localhost:8383/projet-home-swap/server_last/login.php';

      await axios.post(APIBASEURL + 'admin_login.php', JSON.stringify(admin))
      .then(res => {
        if(res.data.error) {
          setError({
            ...res.data.error
          })
        } else {
          try {
            dispatch(auth(res.data));
            navigate('/');
          } catch(e) {
            setError({
              
            })
          }
        }
      })
      .catch(e => {
            setError({

            })
      })

      /* const adminKeysArray = Object.keys(admin);
      let data = new FormData();
      for(let i = 0; i < adminKeysArray.length; i++) {
        data.append(adminKeysArray[i], admin[adminKeysArray[i]]);
      }

      await  axios.post(apiBaseURL, data)
        .then(res => {
          if(res.data.error) {
            setError({
              ...res.data.error
            });
          } else {
            try {
              dispatch(auth(res.data));
              navigate('/');
            } catch(e) {
              alert(e.message);
            }
          }
      }) */
    }
  }

  console.log(admin, error);

  return (
    <div className="AdminSignIn" >
    <form onSubmit={(e) => handleSubmit(e)} >
    <h2 className="mb-3" >Welcome back!</h2>
  <div class="form-outline mb-4">
    <input onChange={(e) => handleChange(e)} value={admin.email} name="email" type="email" id="form2Example1" class="form-control" placeholder="Email address" />
    {error.email && <div className="text-danger">{error.email}</div>}
  </div>
  <div class="form-outline mb-4">
    <input onChange={(e) => handleChange(e)} value={admin.password} name="password" type="password" id="form2Example2" class="form-control" placeholder="Password" />
    {error.password && <div className="text-danger mb-2">{error.password}</div>}
  </div>
  <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
</form>
</div>
  )
}

export default AdminSignIn;