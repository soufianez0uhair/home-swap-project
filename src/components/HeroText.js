import { Link } from "react-router-dom";
import {BsPlayFill} from 'react-icons/bs';

import HouseOptions from "./HouseOptions";

function HeroText({swapSearch, title, description, handleChange}) {

  return (
        <>
          <div className="lc-block mb-3">
            <div editable="rich">
              <h2 className="fw-bold display-4">{title ? title : ''}</h2>
            </div>
          </div>
          <div className="lc-block mb-3">
            <div editable="rich">
              <p className="lead">{description ? description : ''}
              </p>
            </div>
          </div>
          <Link to="https://youtu.be/UtBGiLYjYdE" target="_blank" className="d-flex align-items-center text-decoration-none fs-6 mb-4" ><BsPlayFill className="me-1 fs-3" /> Comment fonctionne l'échange de maison ?</Link>
          <HouseOptions swapSearch={swapSearch} handleChange={handleChange} />
        </>
  )
}

export default HeroText;