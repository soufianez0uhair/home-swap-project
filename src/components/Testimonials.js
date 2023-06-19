import User from "../assets/icons/user.png";
import { Carousel } from 'react-responsive-carousel';
import {MdSwitchAccount} from 'react-icons/md';
import {AiOutlineStar, AiFillStar} from 'react-icons/ai';

export default function Testimonials() {
  const stars = [];
  for(let i = 0; i < 5; i++) {
    if(i < 4) {
      stars.push(<AiFillStar />);
    } else {
      stars.push(<AiOutlineStar />);
    }
  }
  return (
    <div className="Testimonials">
      <h3 >Avis</h3>
      <Carousel autoPlay interval={5000} infiniteLoop>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Magnifique séjour dans ce lieu. Situation parfaite avec une vue incroyable. Logement moderne et bien équipé. Propriétaire sympathique et serviable. Hautement recommandé.</p>
            <h5 className="Testimonial__maker">Soufiane Zouhair</h5>
            {
                stars
              }
          </div>
        </div>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Séjour exceptionnel dans cet endroit. Emplacement idéal offrant une vue imprenable. Logement moderne et bien équipé. Propriétaire aimable et serviable. Recommandation vivement exprimée.</p>
            <h5 className="Testimonial__maker">Hamza Zouhair</h5>
            {
                stars
              }
          </div>
        </div>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Expérience fantastique dans ce logement. Situation idéale avec une vue à couper le souffle. Appartement moderne et bien pourvu en équipements. Propriétaire amical et serviable. Fortement recommandé.

</p>
            <h5 className="Testimonial__maker">Ayoub Naouadi</h5>
              {
                stars
              }
          </div>
        </div>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Séjour inoubliable dans ce superbe logement. Emplacement privilégié avec une vue panoramique. Appartement moderne et doté de tout le nécessaire. Propriétaire très sympathique et disponible. Vivement recommandé.






</p>
            <h5 className="Testimonial__maker">Soufiane Mamdouh</h5>
              {
                stars
              }
          </div>
        </div>
      </Carousel>
    </div>
  );
}