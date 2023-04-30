import UsingSystemStep from "./UsingSystemStep";

import SignUp from '../assets/icons/signup.png';
import Search from '../assets/icons/seo.png';
import Points from '../assets/icons/credit-card-machine.png';
import Travel from '../assets/icons/airplane.png';

function UsingSystemList() {
  const steps = [
    {
      title: 'Create an account for free',
      img: SignUp
    },
    {
      title: 'Search for your next destination',
      img: Search
    },
    {
      title: 'Buy points so you can do your first swap',
      img: Points
    },
    {
      title: 'Enjoy your travel and start enjoying the world',
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