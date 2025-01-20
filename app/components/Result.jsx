import React, { useContext } from "react";

import { ResultsContext } from "../contexts/ResultsContext";
import clsx from "clsx";
import StyledEquation from "./StyledEquation";

function Result() {
  const { display } = useContext(ResultsContext);

  return (
    <div>
      <div
        className={clsx(
          "w-full h-auto my-8 font-thin text-white flex items-center justify-end break-word text-end min-h-[20px]"
        )}
      >
        <StyledEquation equation={display} />
      </div>
    </div>
  );
}

export default Result;
