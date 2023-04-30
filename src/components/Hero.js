import SplitScreen from "../layout/SplitScreen";

import HeroImg from '../assets/images/locations-around-the-globe.gif';
import HeroText from "./HeroText";

function Hero({swapSearch, handleChange, rentSearch}) {
  return (
    <section className="hero">
      <SplitScreen img={HeroImg} >
        <HeroText swapSearch={swapSearch} rentSearch={rentSearch} handleChange={handleChange} title={["Find your next ", <span className="text-primary" >adventure</span>, " now!"]} />
      </SplitScreen>
    </section>
  )
}

export default Hero;