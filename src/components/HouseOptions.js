import {CgArrowsExchange} from 'react-icons/cg';
import {FaDollarSign} from 'react-icons/fa';

import { useState } from 'react';

import SwapSearchForm from './SwapSearchForm';

function HouseOptions({swapSearch, handleChange}) {
  // <SwapSearchForm /> 

  return (
    <SwapSearchForm swapSearch={swapSearch} handleChange={handleChange} />
  )
}

export default HouseOptions;