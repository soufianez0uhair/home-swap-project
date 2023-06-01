import SplitScreen from "../layout/SplitScreen";

import HeroImg from '../assets/images/locations-around-the-globe.gif';
import HeroText from "./HeroText";

function Hero({swapSearch, handleChange}) {
  return (
    <section className="hero">
      <SplitScreen img={HeroImg} >
        <HeroText swapSearch={swapSearch} handleChange={handleChange} title={["Find your next ", <span className="text-primary" >adventure</span>, " now!"]} />
      </SplitScreen>
    </section>
  )
}

export default Hero;