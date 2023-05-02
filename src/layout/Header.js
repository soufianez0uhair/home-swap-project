import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectUser } from '../redux/userSlice';

import Logo from '../assets/icons/logo.png';

const Header = () => {
  const user = useSelector(state => selectUser(state));

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
    <div className="container-fluid">
      <Link to="/"><img src={Logo} alt="logo" style={{width: '3rem'}} /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!user ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/user/signin">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/signup">Register</Link>
          </li>
        </ul> : <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/accommodations/add">+ Add an accommodation</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/profile">{user.nom + ' ' + user.prenom}</Link>
          </li>
        </ul>}
      </div>
    </div>
  </nav>
  )
}

export default Header;