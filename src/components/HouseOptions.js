import {CgArrowsExchange} from 'react-icons/cg';
import {FaDollarSign} from 'react-icons/fa';

import { useState } from 'react';

import SwapSearchForm from './SwapSearchForm';
import RentSearchForm from './RentSearchForm';

function HouseOptions({swapSearch, rentSearch, handleChange, isSwap, setIsSwap}) {
  // <SwapSearchForm /> 

  return (
    <div className="position-relative d-flex" >
      <div className="d-flex flex-column me-3 houseOption" style={{color: isSwap ? 'rgb(13,110,253)' : ''}} onClick={() => setIsSwap(true)} >
        <CgArrowsExchange className="me-4 fs-2" alt="house swap" />
        <h6 className="text-center" >Swap</h6>
      </div>
      <div className="d-flex flex-column justify-content-between houseOption" style={{color: !isSwap ? 'rgb(13,110,253)' : ''}} onClick={() => setIsSwap(false)} >
        <FaDollarSign className="fs-4 heroIcon" alt="house rent" />
        <h6 className="text-center" >Rent</h6>
      </div>
      <div className="position-absolute top-100" >
        {isSwap ? <SwapSearchForm setIsSwap={setIsSwap} swapSearch={swapSearch} handleChange={handleChange} /> : <RentSearchForm rentSearch={rentSearch} handleChange={handleChange} />}
      </div>
    </div>
  )
}

export default HouseOptions;