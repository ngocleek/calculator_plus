"use client";
import React, { useState } from "react";
import { DisplayContext } from "./contexts/DisplayContext";

import History from "./components/History";
import Home from "./components/Home";

export default function App() {
  const [display, setDisplay] = useState(true);

  return (
    <DisplayContext.Provider value={[display, setDisplay]}>
      {display ? <Home /> : <History />}
    </DisplayContext.Provider>
  );
}
