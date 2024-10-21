import React from "react";

import { ResultsContext } from "../contexts/ResultsContext";
import clsx from "clsx";

function Number({ value, width, space }) {
  // receives styling data
  const { display, setDisplay, isDone, setIsDone } =
    React.useContext(ResultsContext);

  function addNumber(number) {
    if (isDone) { // clear if a new number pressed after a result
      setDisplay("");
    }

    if (number === ".") {
      var numbers = display.split(/\+|\-|\*|\//g); // split at + - * /
      const lastNumber = numbers[numbers.length - 1];
      if (lastNumber.includes(".") && !isDone) { // ? Set display have not update display, !isDone to allow '.' button to execute after the previous expression is done
        return; // prevent repeated . on a number
      }

    }

    setDisplay((prev) => prev.concat(number));
    setIsDone(false);
  }

  return (
    <button
      className={clsx(
        "h-20 rounded-full text-white bg-number text-3xl",
        [width !== undefined ? width : "w-20"],
        space
      )} // uses received styling data
      onClick={() => addNumber(value)}
    >
      {value}
    </button>
  );
}

export default Number;
