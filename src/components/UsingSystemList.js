import UsingSystemStep from "./UsingSystemStep";

import SignUp from '../assets/icons/signup.png';
import Search from '../assets/icons/seo.png';
import Points from '../assets/icons/credit-card-machine.png';
import Travel from '../assets/icons/airplane.png';

function UsingSystemList() {
  const steps = [
    {
      title: 'Créer un compte gratuitement',
      img: SignUp
    },
    {
      title: 'Recherchez votre prochaine destination',
      img: Search
    },
    {
      title: 'Recherchez votre prochaine destination',
      img: Points
    },
    {
      title: 'Commencez à profiter du monde',
      img: Travel
    }
  ];

  return (
    <div className="container text-center" >
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4" >
        {
          steps.map(step => <UsingSystemStep img={step.img} title={step.title} />)
        }
      </div>
    </div>
  )
}

export default UsingSystemList;