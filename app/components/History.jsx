import React from 'react';

import { HistoryContext } from '../contexts/HistoryContext.js';

function History() {
  const {
    setIsHistoryShown,
    history,
    setHistory,
  } = React.useContext(HistoryContext)

  function closeHistory() {
    setIsHistoryShown(false)
  }
  function cleanHistory() {
    setHistory([])
  }


  return (
    <div className="w-full h-screen flex flex-col absolute px-4 pt-4 bg-black rounded-2xl max-w-sm z-10   ssm:border-r ssm:border-r-border ssm:border-l ssm:border-l-border">

      <section className="w-full h-auto pb-4 flex flex-row justify-between">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={32} height={32}
          className="top-4 fill-current text-gray-400   hover:cursor-pointer hover:scale-110 transition-all duration-200"
          onClick={closeHistory}>
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        <span className="text-white text-2xl font-semibold">History</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={28} height={28}
          className="top-4 fill-current text-gray-400   hover:text-red-600 hover:cursor-pointer hover:scale-110 transition-all duration-200"
          onClick={cleanHistory}>
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
      </section>

      <section className="w-full h-auto p-1 border-y border-t-border border-b-border rounded-b-lg">
        <p className="text-center text-utility">This won't be lost on page reload</p>
      </section>

      <section className="w-full h-full max-h-full bg-black py-2 flex flex-col justify-end overflow-y-auto">
        {history.map(item => (  // prints an item for each entry of history
          <div
            className="h-auto flex flex-col justify-end text-end space-y-1 py-1 px-2 mb-2 border-t border-t-border"
            key={history.indexOf(item)}   // uses array position as index due to lack of own index
          >
            <span className="text-2xl text-utility">{item.operation}</span>
            <span className="text-3xl text-white">{item.result}</span>
          </div>
        ))}
      </section>

    </div>
  );
}

export default History;