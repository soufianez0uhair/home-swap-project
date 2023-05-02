import { useState } from "react";
import {emailValidator, nameValidator, passwordValidator, phoneNumValidator} from '../helpers/validator';
import { Link } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux';
import { auth } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
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
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    password: '',
    password2: '',
    allFields: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if(!user.prenom || !user.nom || !user.email || !user.telephone || !user.adresse || !user.password || !user.password2) {
      setError({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        password: '',
        password2: '',
        allFields: 'Veuillez remplir tous les champs.'
      })
    } else if(!nameValidator(user.prenom)) {
      setError({
        prenom: 'Veuillez utiliser votre vrai prénom.',
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        password: '',
        password2: ''
      })
    } else if(!nameValidator(user.nom)) {
      setError({
        prenom: '',
        nom: 'Veuillez utiliser votre vrai nom.',
        email: '',
        telephone: '',
        adresse: '',
        password: '',
        password2: ''
      })
    } else if(!emailValidator(user.email)) {
      setError({
        prenom: '',
        nom: '',
        email: 'Veuillez utiliser un email valide.',
        telephone: '',
        adresse: '',
        password: '',
        password2: ''
      })
    } else if(!phoneNumValidator(user.telephone)) {
      setError({
        nom: '',
        prenom: '',
        email: '',
        telephone: 'Veuillez saisir un numero valide.',
        adresse: '',
        password: '',
        password2: '',
      })
    } else if(!passwordValidator(user.password)) {
      setError({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        password: 'Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.',
        password2: '',
      })
    } else if(user.password !== user.password2) {
      setError({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        password: '',
        password2: 'Les mots de passe doivent correspondre.',
      })
    } else {
      const url = 'http://homeswaper2023.000webhostapp.com/signup.php';

      const userKeysArray = Object.keys(user);
      let data = new FormData();
      for(let i = 0; i < userKeysArray.length; i++) {
        data.append(userKeysArray[i], user[userKeysArray[i]]);
      }

      await axios.post(url, data)
        .then(res => {
        // res = JSON.parse(res);
        console.log(res.data);
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
    })
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-4 px-3" style={{minHeight: "100vh"}} >
      <form className="row mx-auto g-3" onSubmit={(e) => handleSubmit(e)} >
        <h1>Créez votre compte!</h1>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="prenom" required>Prénom</label>
          <input className="form-control" type="text" id="prenom" onChange={(e) => handleChange(e)} value={user.prenom} name="prenom" />
          {error.prenom && <div className="text-danger">{error.prenom}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="nom">Nom</label>
          <input className="form-control" type="text" id="nom" onChange={(e) => handleChange(e)} value={user.nom} name="nom" />
          {error.nom && <div className="text-danger">{error.nom}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="text" id="email" onChange={(e) => handleChange(e)} value={user.email} name="email" />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>
        <div className="col-lg-6">
          <label className="form-label" htmlFor="telephone">Téléphone</label>
          <input className="form-control" type="tel" id="telephone" onChange={(e) => handleChange(e)} value={user.telephone} name="telephone" />
          {error.telephone && <div className="text-danger">{error.telephone}</div>}
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="adresse" >Adresse</label>
          <input className="form-control" type="text" id="adresse" onChange={(e) => handleChange(e)} value={user.adresse} name="adresse" />
          {error.adresse && <div className="text-danger">{error.adresse}</div>}
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