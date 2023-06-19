import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { selectUser , logout} from '../redux/userSlice';

import Logo from '../assets/icons/logo.png';

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => selectUser(state));

  const LOCATION = useLocation().pathname;

  return (
    <nav style={{display: LOCATION.indexOf('admin') !== -1 ? 'none' : 'flex'}}  className="navbar navbar-expand-lg bg-body-tertiary fixed-top justify-content-between" >
    <div className="container-fluid">
      <Link to="/"><img src={Logo} alt="logo" style={{width: '3rem'}} /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
  {!user ? (
    <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to="/user/signin">Se connecter</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user/signup">S'inscrire</Link>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0">
      <li className="nav-item">
      <Link className="nav-link" to="/accommodations/add" >Bonjour {user.last_name + ' ' + user.first_name}</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/accommodations/add">+ Ajouter un bien</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/user/dashboard">Tableau de bord</Link>
      </li>
      <li className="nav-item ms-auto">
        <p className="nav-link" style={{cursor: "pointer"}} onClick={() => dispatch(logout())}>Se déconnecter</p>
      </li>
    </ul>
  )}
</div>
    </div>
  </nav>
  )
}

export default Header;