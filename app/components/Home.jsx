"use client";
import React, { useContext, useState } from "react";
import { useResults } from "./hooks/useResults";

import { ResultsContext } from "./contexts/ResultsContext";
import { HistoryContext } from "./contexts/HistoryContext";
import { DisplayContext } from "./contexts/DisplayContext";

import Buttons from "./Buttons";
import Result from "./Result";
import History from "./History";
import Recent from "./Recent";

import { LuHistory } from "react-icons/lu";
import { useHistory } from "./hooks/useHistory";
import Download from "./components/Download";

function Home() {
  const results = useResults();
  const [display, setDisplay] = useContext(Display);

  return (
    <ResultsContext.Provider value={results}>
      <div className="w-screen h-screen flex justify-center">
        <div className="w-full h-full flex flex-col justify-end p-4 bg-black rounded-2xl max-w-md ssm:border-r ssm:border-r-border ssm:border-l ssm:border-l-border">
          <LuHistory
            onClick={() => setDisplay(!display)}
            className="absolute top-4 size-9 text-gray-400   hover:cursor-pointer hover:scale-110 transition-all duration-200"
          />
          <Result />
          <Buttons />
        </div>
      </div>
    </ResultsContext.Provider>
  );
}
