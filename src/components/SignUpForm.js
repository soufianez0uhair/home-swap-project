function SignUpForm() {
  return (
    <form class="row mx-auto mt-auto g-3" >
      <h1>Créez votre compte!</h1>
      <div className="col-md-6">
        <label className="form-label" htmlFor="prenom">Prénom</label>
        <input className="form-control" type="text" id="nom" name="prenom" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="nom">Nom</label>
        <input className="form-control" type="text" id="nom" name="nom" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-control" type="email" id="email" name="email" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="telephone">Téléphone</label>
        <input className="form-control" type="tel" id="telefone" name="telefone" />
      </div>
    <div className="col-12">
      <label className="form-label" htmlFor="adresse" >Adresse</label>
      <input className="form-control" type="text" id="adresse" name="adresse" />
    </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-control" type="password" id="password" name="password" />
      </div>
      <div className="col-md-6">
        <label className="form-label" htmlFor="password2">Confirm password</label>
        <input className="form-control" type="password" id="password2" name="password2" />
      </div>
      <button className="btn btn-primary col-2" >S'inscrire</button>
  </form>
  )
}

export default SignUpForm;