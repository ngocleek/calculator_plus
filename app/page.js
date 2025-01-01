"use client";
import React, { useContext, useState } from "react";
import { useResults } from "./hooks/useResults";

import { ResultsContext } from "./contexts/ResultsContext";
import { HistoryContext } from "./contexts/HistoryContext";
import { DisplayContext } from "./contexts/DisplayContext";

import Buttons from "./components/Buttons";
import Result from "./components/Result";
import History from "./components/History";
import Home from "./components/Home";
import Recent from "./components/Recent";

import { LuHistory } from "react-icons/lu";
import { useHistory } from "./hooks/useHistory";
import Download from "./components/Download";

export default function App() {
  const [display, setDisplay] = useState(false);

  return (
    <Display.Provider value={[display, setDisplay]}>
      <>{display ? <History /> : <Home />}</>
    </Display.Provider>
  );
}
