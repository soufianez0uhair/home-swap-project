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
        <h1 className="fw-bold mb-5" >Pourquoi choisir l'échange ?</h1>
        <p className="fs-5 w-75 text-center" >L'échange de maisons vous permet de voyager comme un local, d'économiser de l'argent sur l'hébergement et de découvrir de nouvelles destinations d'une manière unique et authentique.</p>
      </section>
      <section className="how d-flex flex-column align-items-center mb-5">
        <h1 className="fw-bold mb-5" >Comment fonctionne notre système ?</h1>
        <UsingSystemList />
      </section>
      <section className="whyHomeSwapping d-flex flex-column align-items-center">
        <h1 className="fw-bold text-center" >Le monde est sous vos doigts !</h1>
        <SplitScreen img={House} ><WhyText title="Lieux que vous adorerez" description="Que vous cherchiez à changer, à faire une pause locale ou à travailler depuis la maison de quelqu'un d'autre, nous avons ce que vous cherchez." /></SplitScreen>
        <SplitScreen img={Trust} ><WhyText title="Des personnes de confiance" description="Avec nos directives de sécurité en place, échangez des maisons avec des membres fiers de la maison qui traiteront votre maison comme la leur. Évitez les hôtels bondés et restez là où vivent les habitants, avec tout le confort de la maison." /></SplitScreen>
        <SplitScreen img={ReduceCosts} ><WhyText title="Des prix que vous allez adorer" description="Nos membres surclassent leurs vacances en quelque chose de plus intéressant, confortable et agréable... et dépensent moins." /></SplitScreen>
      </section>
    </>
  )
}

export default Home;