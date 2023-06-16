import SplitScreen from "../layout/SplitScreen";

import HeroImg from '../assets/images/locations-around-the-globe.gif';
import HeroText from "./HeroText";

function Hero({swapSearch, handleChange}) {
  return (
    <section className="hero">
      <SplitScreen img={HeroImg} >
        <HeroText swapSearch={swapSearch} handleChange={handleChange} title={["Trouvez votre prochaine ", <span className="text-primary" >aventure</span>, " maintenant!"]} />
      </SplitScreen>
    </section>
  )
}

export default Hero;