import React, { useContext } from 'react';

import { ResultsContext } from '../contexts/ResultsContext';
import { HistoryContext } from '../contexts/HistoryContext';


function Calculate() {
  const {
    display,
    setDisplay,
    setHistory,
  } = useContext(ResultsContext);

  function Calc() {
    try {
      const result = eval(display).toString();

      setDisplay(result);
      setHistory((prev) => [...prev, {
        time: Date.now(),
        expression: display,
        result: result
      }])
    } catch (error) {
      alert(error)
    }
  }


  return (
    <button
      className='w-18 h-18 rounded-full text-white bg-operation'
      onClick={() => Calc()}
    >
      =
    </button>
  )
}

export default Calculate;