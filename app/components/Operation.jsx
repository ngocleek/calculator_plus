import React from 'react';

import { ResultsContext } from '../contexts/ResultsContext';

function Operation({value, label}) {
  const { display, setDisplay } = React.useContext(ResultsContext)

  function addOperation(operation) {
    console.log(operation)
    
    // Check if previous char is a operation
    const prevChar = display.trim().slice(-1);
    if (['+', '-', '*', '\\'].includes(prevChar)) {
      setDisplay((prev) => {
        const _prev = prev.slice(0, -1); //remove the last character
        return _prev.concat(operation);
      });
    } else {
      setDisplay((prev) => prev.concat(operation));
    }
    
  }

  return (
    <button
      className='w-20 h-20 rounded-full text-white bg-operation text-3xl'
      onClick={() => addOperation(value)}
    >
    {label ? label :value}
    </button>
  );
}

export default Operation;