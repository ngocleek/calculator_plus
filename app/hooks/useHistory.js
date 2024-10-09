import React from 'react';

function useHistory() {
  const [isHistoryShown, setIsHistoryShown] = React.useState(false)
  const [history, setHistory] = React.useState([])
  const [bringData, setBringData] = React.useState(true)  // flag to know if it has to read or write data into localStorage

  React.useEffect(() => {
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


  return {
    isHistoryShown,
    setIsHistoryShown,
    history,
    setHistory,
  }
}

export { useHistory };