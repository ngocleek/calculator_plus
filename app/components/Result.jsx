import React, { useContext } from 'react';

import { ResultsContext } from '../contexts/ResultsContext';
import clsx from 'clsx';
import StyledEquation from './StyledEquation';
import Recent from './Recent';

function Result() {
  const { display, history } = useContext(ResultsContext)
  console.log(history);
  // console.log("Hi " + history[0].expression);

  return(
    <div>
      {/* <Recent /> */}
      <div className={clsx('w-full h-auto mb-10 font-thin text-white flex items-center justify-end break-word text-end')}>
      <StyledEquation equation={display} />
    </div>
    </div>
  );
}

export default Result;