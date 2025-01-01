"use client";
import React, { useContext, useState } from "react";
import { useResults } from "../hooks/useResults";

import { ResultsContext } from "../contexts/ResultsContext";
import { HistoryContext } from "../contexts/HistoryContext";
import { DisplayContext } from "../contexts/DisplayContext";

import Buttons from "./Buttons";
import Result from "./Result";
import Recent from "./Recent";

import { LuHistory } from "react-icons/lu";
import { useHistory } from "../hooks/useHistory";
import Download from "./Download";

function History() {
  const results = useResults();
  const { history } = useHistory();
  const [display, setDisplay] = useContext(DisplayContext);

  const handleSave = async () => {
    history.map((data, index) => {
      const entry = {
        date: data.time,
        time: data.time,
        calculation: data.expression,
        result: data.result,
      };
      console.log("entry", entry);
    });
    console.log(process.env.NEXT_PUBLIC_SHEET_ID);
    console.log(process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIAL);
  };

  return (
    <ResultsContext.Provider value={results}>
      <div className="w-screen h-screen flex justify-center">
        <div className="w-full h-full flex flex-col justify-end p-4 bg-black rounded-2xl max-w-md ssm:border-r ssm:border-r-border ssm:border-l ssm:border-l-border">
          <div className="w-full flex justify-between">
            <LuHistory
              onClick={() => setDisplay(!display)}
              className="relative size-9 text-gray-400   hover:cursor-pointer hover:scale-110 transition-all duration-200"
            />
            <Download />
          </div>
          <Recent />
        </div>
      </div>
    </ResultsContext.Provider>
  );
}
