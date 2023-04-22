import { useState } from "react";
import { emailValidator } from "../helpers/validator";

function SignInForm() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const [error, setError] = useState({
    email: '',
    password: '',
    allFields: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    if(!user.email || !user.password) {
      setError({
        email: '',
        password: '',
        allFields: 'Veuillez remplir tous les champs.'
      })
    } else if(!emailValidator(user.email)) {
      setError({
        email: 'Veuillez utiliser un email valide.',
        password: '',
        allfields: ''
      })
    }
  }

  console.log(user);
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <form className="d-flex flex-column" onSubmit={(e) => handleSubmit(e)} >
        <h1>Soyez le bienvenu!</h1>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="text" id="email" onChange={(e) => handleChange(e)} value={user.email} name="email" />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password" >Mot de passe</label>
          <input className="form-control" type="password" id="password" onChange={(e) => handleChange(e)} value={user.password} name="password" />
        </div>
        <button className="btn btn-primary mb-2" type="submit" >Se connecter</button>
        {error.allFields && <div className="text-danger mb-2">{error.allFields}</div>}
      </form>
    </div>
  )
}

export default SignInForm;