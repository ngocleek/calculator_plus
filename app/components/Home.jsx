"use client";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useResults } from "../hooks/useResults";

import { ResultsContext } from "../contexts/ResultsContext";
import { DisplayContext } from "../contexts/DisplayContext";

import Buttons from "./Buttons";
import Result from "./Result";

import { LuHistory } from "react-icons/lu";
import { format, formatRelative } from "date-fns";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useDeleteHandler } from '../hooks/useDeleteHandler';
import { DeleteDialog } from './DeleteDialog';
import { formatExpression } from "../utils/formatExpression";
import Settings from './Settings';
import { LuSettings2 } from "react-icons/lu";

function Home() {
  const results = useResults();
  const [display, setDisplay] = useContext(DisplayContext);
  const scrollbarRef = useRef(null);
  const [scrollElement, setScrollElement] = useState(null);
  
  const {
    selectedItem,
    showDeleteDialog,
    setShowDeleteDialog,
    handleTouchStart,
    handleTouchEnd,
  } = useDeleteHandler();

  const todayCalculated = results.history.filter((row) => format(row.time, "P") === format(new Date(), "P"));

  const [showSettings, setShowSettings] = useState(false);

  const onDelete = (item) => {
    const newHistory = results.history.filter(h => h.time !== item.time);
    results.setHistory(newHistory);
  };

  useEffect(() => {
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [scrollElement]);

  return (
    <ResultsContext.Provider value={results}>
      <div className="w-screen h-screen flex justify-center">
        <div className="w-full h-full flex flex-col justify-end p-4 bg-black rounded-2xl max-w-md ssm:border-r ssm:border-r-border ssm:border-l ssm:border-l-border">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <LuHistory
                onClick={() => setDisplay(!display)}
                className="size-9 text-gray-400 hover:cursor-pointer hover:scale-110 transition-all duration-200"
              />
              <LuSettings2
                onClick={() => setShowSettings(true)}
                className="size-9 text-gray-400 hover:cursor-pointer hover:scale-110 transition-all duration-200"
              />
            </div>
            <p className="text-white text-xl font-medium bg-gray-800 rounded-full px-2 py-1">{todayCalculated.length}</p>
          </div>
          <div className="pt-10 flex-1 overflow-hidden">
            <PerfectScrollbar
              containerRef={setScrollElement}
              options={{ suppressScrollX: true }}
              className="h-full"
            >
              {todayCalculated.map((data, index) => (
                <div
                  key={index}
                  className="py-3 active:bg-gray-800 transition-colors duration-200 px-2 hover:bg-gray-800 border-t border-t-border"
                  role="button"
                  tabIndex={0}
                  onTouchStart={() => handleTouchStart(data)}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={() => handleTouchStart(data)}
                  onMouseUp={handleTouchEnd}
                  onMouseLeave={handleTouchEnd}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleTouchEnd(); }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-16">
                      <p className="text-sm font-medium truncate text-white">
                        {format(data.time, "p")}
                      </p>
                    </div>
                    <div className="text-lg font-thin text-end tracking-wider text-operation">
                      {formatExpression(data.expression)}{" "}
                      <span className="text-white font-medium">
                        = {data.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </PerfectScrollbar>
          </div>
          <Result />
          <Buttons />
        </div>
        
        <DeleteDialog
          visible={showDeleteDialog}
          onHide={() => setShowDeleteDialog(false)}
          onDelete={onDelete}
          selectedItem={selectedItem}
          formatExpression={formatExpression}
        />
        
        <Settings 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    </ResultsContext.Provider>
  );
}
export default Home;
