import { useState } from "react";
import {emailValidator, nameValidator, passwordValidator, phoneNumValidator} from '../helpers/validator';

function SignUpForm() {
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

  function handleSubmit(e) {
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
        telephone: 'Veuillez saisir votre numero.',
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
    }
  }

  console.log(error);
  return (
    <form className="row mx-auto mx-sm-3 mt-auto g-3" onSubmit={(e) => handleSubmit(e)} >
      <h1>Créez votre compte!</h1>
      <div className="col-md-6">
        <label className="form-label" htmlFor="prenom" required>Prénom</label>
        <input className="form-control" type="text" id="prenom" onChange={(e) => handleChange(e)} value={user.prenom} name="prenom" />
        {error.prenom && <div class="text-danger">{error.prenom}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nom">Nom</label>
        <input className="form-control" type="text" id="nom" onChange={(e) => handleChange(e)} value={user.nom} name="nom" />
        {error.nom && <div class="text-danger">{error.nom}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-control" type="text" id="email" onChange={(e) => handleChange(e)} value={user.email} name="email" />
        {error.email && <div class="text-danger">{error.email}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="telephone">Téléphone</label>
        <input className="form-control" type="tel" id="telephone" onChange={(e) => handleChange(e)} value={user.telephone} name="telephone" />
        {error.telephone && <div class="text-danger">{error.telephone}</div>}
      </div>
    <div className="col-12">
      <label className="form-label" htmlFor="adresse" >Adresse</label>
      <input className="form-control" type="text" id="adresse" onChange={(e) => handleChange(e)} value={user.adresse} name="adresse" />
      {error.adresse && <div class="text-danger">{error.adresse}</div>}
    </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="password" >Mot de passe</label>
        <input className="form-control" type="password" id="password" onChange={(e) => handleChange(e)} value={user.password} name="password" />
        {error.password && <div class="text-danger">{error.password}</div>}
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="password2">Re-saisissez votre mot de passe</label>
        <input className="form-control" type="password" id="password2" onChange={(e) => handleChange(e)} value={user.password2} name="password2" />
        {error.password2 && <div class="text-danger">{error.password2}</div>}
      </div>
      {error.allFields && <div class="text-danger">{error.allFields}</div>}
      <button className="btn btn-primary col-lg-2 col-sm-3" type="submit" >S'inscrire</button>
  </form>
  )
}

export default SignUpForm;