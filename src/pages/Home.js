import { useState } from "react";

import Hero from "../components/Hero";
import UsingSystemList from "../components/UsingSystemList";
import SplitScreen from "../layout/SplitScreen";
import WhyText from "../components/WhyText";

import House from '../assets/images/NewHouse_SA_Photo_01.jpg';
import Trust from '../assets/images/265575_00_2x.jpg';
import ReduceCosts from '../assets/images/img-cost-reduction-approach.png';

function Home({swapSearch, handleChange}) {

  return (
    <>
      <Hero handleChange={handleChange} swapSearch={swapSearch} />
      <section className="why d-flex flex-column align-items-center mb-5">
        <h1 className="fw-bold mb-5" >Why choose swapping?</h1>
        <p className="fs-5 w-75 text-center" >Home swapping allows you to travel like a local, save money on accommodations, and experience new destinations in a unique and authentic way.</p>
      </section>
      <section className="how d-flex flex-column align-items-center mb-5">
        <h1 className="fw-bold mb-5" >How our system works?</h1>
        <UsingSystemList />
      </section>
      <section className="whyHomeSwapping d-flex flex-column align-items-center">
        <h1 className="fw-bold text-center" >The World is under your fingertips!</h1>
        <SplitScreen img={House} ><WhyText title="Places you'll adore" description="Whether you’re looking to switch it up, take a local break, or work from someone else’s home, we have what you are looking for." /></SplitScreen>
        <SplitScreen img={Trust} ><WhyText title="People you'll trust" description="With our safety guidelines in place, swap homes with house proud members who will treat your place like their own. Avoid crowded hotels and stay where the locals live, with all the creature comforts of home." /></SplitScreen>
        <SplitScreen img={ReduceCosts} ><WhyText title="Prices you'll love" description="Our members upgrade their vacations to something more interesting, comfortable and enjoyable... and actually spend less." /></SplitScreen>
      </section>
    </>
  )
}

export default Home;