import React, { useEffect, useState } from 'react';

function useResults() {
  const [display, setDisplay] = useState("");
  const [finalResult, setFinalResult] = useState('')  // used for result printing
  const [isDone, setIsDone] = useState(true)        // allows or blocks replacement of result after calculus
  
  const [bringData, setBringData] = React.useState(true)  // flag to know if it has to read or write data into localStorage

  const [textResult, setTextResult] = useState('')
  
  const [history, setHistory] = React.useState([])
  
  useEffect(() => {
    if (bringData) {
      const localStorageData = localStorage.getItem('RESULTS');
      if (localStorageData) {
        const parsedData = JSON.parse(localStorageData);
        setHistory(parsedData)  // saves retrieved data from localStorage into 'history'
      } else {
        localStorage.setItem('RESULTS', JSON.stringify([])) // creates a 'RESULTS' item in localStorage -> Avoids error if first time use
      }
      setBringData(false) // once data is read, it doesn't need to be read again, so it switches to writing
    } else {
      localStorage.setItem('RESULTS', JSON.stringify(history))
    }
  }, [history]) // executes once and every time 'history' changes
  /* useEffect(() => {
  }, []) */

  return {
    finalResult,
    setFinalResult,
    isDone,
    setIsDone,
    textResult,
    display,
    setDisplay,
    history,
    setHistory
  }
}

export { useResults };