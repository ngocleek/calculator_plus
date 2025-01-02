import React, { useContext } from "react";
import { evaluate, format } from "mathjs";

import { ResultsContext } from "../contexts/ResultsContext";
import { HistoryContext } from "../contexts/HistoryContext";

function Calculate() {
  const { display, setDisplay, setHistory, setIsDone } =
    useContext(ResultsContext);

  function Calc() {
    try {
      const result = format(evaluate(display), { precision: 14 });

      setDisplay(result);
      setHistory((prev) => [
        ...prev,
        {
          time: Date.now(),
          expression: display,
          result: result,
        },
      ]);
      setIsDone(true);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <button
      className="w-18 h-18 rounded-full text-white bg-operation"
      onClick={() => Calc()}
    >
      =
    </button>
  );
}

export default Calculate;
