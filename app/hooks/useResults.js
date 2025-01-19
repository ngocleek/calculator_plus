import React, { useEffect, useState } from "react";
import { syncWithGoogleSheets } from "../utils/googleSheets";

function useResults() {
  const [display, setDisplay] = useState("");
  const [finalResult, setFinalResult] = useState("");
  const [isDone, setIsDone] = useState(true);
  const [textResult, setTextResult] = useState("");
  const [history, setHistory] = React.useState([]);

  // Load from localStorage only on initial load
  useEffect(() => {
    const localStorageData = localStorage.getItem("RESULTS");
    if (localStorageData) {
      setHistory(JSON.parse(localStorageData));
    }
  }, []);

  // Save to localStorage and push to Google Sheets whenever history changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("RESULTS", JSON.stringify(history));
      // Push the updated history to Google Sheets
      syncWithGoogleSheets(history).catch(error => {
        console.error('Failed to sync with Google Sheets:', error);
      });
    }
  }, [history]);

  return {
    finalResult,
    setFinalResult,
    isDone,
    setIsDone,
    textResult,
    display,
    setDisplay,
    history,
    setHistory,
  };
}

export { useResults };
