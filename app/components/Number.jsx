import React from 'react';

import { ResultsContext } from '../contexts/ResultsContext';
import clsx from 'clsx';

function Number({value, width, space}) {  // receives styling data
  const {
    display,
    setDisplay,
    isDone,
    setIsDone
  } = React.useContext(ResultsContext);


  function addNumber(number) {
    console.log(number);
    if (number === '.') {
      const numbers = display.match(/\d+\.?\d*/g);
      const lastNumber = numbers[numbers.length - 1];
      console.log(lastNumber);
      if (lastNumber.includes(".")) return;
    }
    if (isDone) {
      // clear if a new number pressed after a result
      setDisplay(number);
    } else {
      setIsDone(false);
      setDisplay((prev) => prev.concat(number));
    }
    console.log("hello " + display);
  }


  return (
    <button
      className={clsx('h-20 rounded-full text-white bg-number text-3xl', [width!==undefined ? width : 'w-20'], space)}  // uses received styling data
      onClick={() => addNumber(value)}
    >
    {value}
    </button>
  );
}

export default Number;