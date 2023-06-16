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
      <Carousel autoPlay infiniteLoop>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Superbe séjour dans cet appartement à Azemmour. Emplacement idéal avec vue imprenable. Appartement moderne et bien équipé. Propriétaire sympathique et serviable. Recommandé vivement.</p>
            <h5 className="Testimonial__maker">Marie Jane</h5>
            {
                stars
              }
          </div>
        </div>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Superbe séjour dans cet appartement à Azemmour. Emplacement idéal avec vue imprenable. Appartement moderne et bien équipé. Propriétaire sympathique et serviable. Recommandé vivement.</p>
            <h5 className="Testimonial__maker">Marie Jane</h5>
            {
                stars
              }
          </div>
        </div>
        <div className="Testimonial">
          <MdSwitchAccount style={{fontSize: "8rem"}} />
          <div className="Testimonial__content">
            <p className="lead Testimonial__body">Superbe séjour dans cet appartement à Azemmour. Emplacement idéal avec vue imprenable. Appartement moderne et bien équipé. Propriétaire sympathique et serviable. Recommandé vivement.</p>
            <h5 className="Testimonial__maker">Marie Jane</h5>
              {
                stars
              }
          </div>
        </div>
      </Carousel>
    </div>
  );
}