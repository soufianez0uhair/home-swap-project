import { useState } from "react";

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

  return (
    <form className="row mx-auto mt-auto g-3" >
      <h1>Créez votre compte!</h1>
      <div className="col-md-6">
        <label className="form-label" htmlFor="prenom">Prénom</label>
        <input className="form-control" type="text" id="prenom" onChange={(e) => handleChange(e)} name="prenom" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nom">Nom</label>
        <input className="form-control" type="text" id="nom" onChange={(e) => handleChange(e)} name="nom" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-control" type="email" id="email" onChange={(e) => handleChange(e)} name="email" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="telephone">Téléphone</label>
        <input className="form-control" type="tel" id="telephone" onChange={(e) => handleChange(e)} name="telephone" />
      </div>
    <div className="col-12">
      <label className="form-label" htmlFor="adresse" >Adresse</label>
      <input className="form-control" type="text" id="adresse" onChange={(e) => handleChange(e)} name="adresse" />
    </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-control" type="password" id="password" onChange={(e) => handleChange(e)} name="password" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="password2">Confirm password</label>
        <input className="form-control" type="password" id="password2" onChange={(e) => handleChange(e)} name="password2" />
      </div>
      <button className="btn btn-primary col-2" >S'inscrire</button>
  </form>
  )
}

export default SignUpForm;