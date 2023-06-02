import { useState } from "react";
import {emailValidator, nameValidator, passwordValidator, phoneNumValidator} from '../helpers/validator';
import { Link } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux';
import { auth } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { APIBASEURL } from "../helpers/sharedVariables";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password2: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password2: '',
    allFields: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if(!user.first_name || !user.last_name || !user.email || !user.phone || !user.address || !user.password || !user.password2) {
      setError({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password2: '',
        allFields: 'Veuillez remplir tous les champs.'
      })
    } else if(!nameValidator(user.first_name)) {
      setError({
        first_name: 'Veuillez utiliser votre vrai prélast_name.',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password2: ''
      })
    } else if(!nameValidator(user.last_name)) {
      setError({
        first_name: '',
        last_name: 'Veuillez utiliser votre vrai last_name.',
        email: '',
        phone: '',
        address: '',
        password: '',
        password2: ''
      })
    } else if(!emailValidator(user.email)) {
      setError({
        first_name: '',
        last_name: '',
        email: 'Veuillez utiliser un email valide.',
        phone: '',
        address: '',
        password: '',
        password2: ''
      })
    } else if(!phoneNumValidator(user.phone)) {
      setError({
        last_name: '',
        first_name: '',
        email: '',
        phone: 'Veuillez saisir un numero valide.',
        address: '',
        password: '',
        password2: '',
      })
    } else if(!passwordValidator(user.password)) {
      setError({
        last_name: '',
        first_name: '',
        email: '',
        phone: '',
        address: '',
        password: 'Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.',
        password2: '',
      })
    } else if(user.password !== user.password2) {
      setError({
        last_name: '',
        first_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password2: 'Les mots de passe doivent correspondre.',
      })
    } else {
      const url = 'http://localhost:8383/projet-home-swap/server3/signup.php';

      const userKeysArray = Object.keys(user);
      let data = new FormData();
      for(let i = 0; i < userKeysArray.length; i++) {
        data.append(userKeysArray[i], user[userKeysArray[i]]);
      }

      await axios.post(APIBASEURL + 'signup.php', JSON.stringify(user))
      .then(res => {
        if(res.data.error) {
          setError({
            ...res.data.error
          })
        } else {
          console.log(res.data);
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
      /* await axios.post(url, data)
        .then(res => {
        // res = JSON.parse(res);
        const resObj = JSON.parse(JSON.stringify(res));
        console.log(res, resObj);
        if(resObj.data.error) {
          setError({
            ...resObj.data.error
          });
        } else {
          try {
            dispatch(auth(resObj.data));
            navigate('/');
          } catch(e) {
            alert(e.message);
          }
        }
    }) */
    }
  }

  console.log(error, user);

  return (
    <div className="d-flex align-items-center justify-content-center py-4 px-3" style={{minHeight: "100vh"}} >
      <form className="row mx-auto g-3" onSubmit={(e) => handleSubmit(e)} >
        <h1>Créez votre compte!</h1>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="first_name" required>last_name</label>
          <input className="form-control" type="text" id="first_name" onChange={(e) => handleChange(e)} value={user.first_name} name="first_name" />
          {error.first_name && <div className="text-danger">{error.first_name}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="last_name">last_name</label>
          <input className="form-control" type="text" id="last_name" onChange={(e) => handleChange(e)} value={user.last_name} name="last_name" />
          {error.last_name && <div className="text-danger">{error.last_name}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="text" id="email" onChange={(e) => handleChange(e)} value={user.email} name="email" />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="phone">Téléphone</label>
          <input className="form-control" type="tel" id="phone" onChange={(e) => handleChange(e)} value={user.phone} name="phone" />
          {error.phone && <div className="text-danger">{error.phone}</div>}
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="address" >address</label>
          <input className="form-control" type="text" id="address" onChange={(e) => handleChange(e)} value={user.address} name="address" />
          {error.address && <div className="text-danger">{error.address}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="password" >Mot de passe</label>
          <input className="form-control" type="password" id="password" onChange={(e) => handleChange(e)} value={user.password} name="password" />
          {error.password && <div className="text-danger">{error.password}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="password2">Re-saisissez votre mot de passe</label>
          <input className="form-control" type="password" id="password2" onChange={(e) => handleChange(e)} value={user.password2} name="password2" />
          {error.password2 && <div className="text-danger">{error.password2}</div>}
        </div>
        {error.allFields && <div className="text-danger">{error.allFields}</div>}
        <button className="btn btn-primary col-lg-2 col-sm-3" type="submit" >S'inscrire</button>
        <div>Vous avez déjà un compte ? <Link to="/user/signin">Connectez-vous</Link></div>
      </form>
    </div>
  )
}

export default SignUpForm;