import React, { useContext, useState, useEffect } from "react";

import { ResultsContext } from "../contexts/ResultsContext";
import { format, formatRelative } from "date-fns";
import { Calendar } from "primereact/calendar";
import vi from "date-fns/locale/vi";
import { useDeleteHandler } from '../hooks/useDeleteHandler';
import { DeleteDialog } from './DeleteDialog';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { formatExpression } from "../utils/formatExpression";

function Recent() {
  const { history, setHistory } = useContext(ResultsContext);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [filteredHistory, setFilteredHistory] = useState(history);
  
  const {
    selectedItem,
    showDeleteDialog,
    setShowDeleteDialog,
    handleTouchStart,
    handleTouchEnd,
  } = useDeleteHandler();

  useEffect(() => {
    if (dates === null) {
      setFilteredHistory(history.filter((row) => format(row.time, "P") === format(new Date(), "P")));
    } else if (dates.length === 1 || (dates.length === 2 && dates[1] === null)) {
      setFilteredHistory(history.filter((row) => format(row.time, "P") === format(dates[0], "P")));
    } else {
      setFilteredHistory(
        history.filter((row) => {
          const current = new Date(format(row.time, "P"));
          const start = new Date(format(dates[0], "P"));
          const end = new Date(format(dates[1], "P"));
          return current >= start && current <= end;
        })
      );
    }
  }, [dates, history]);

  const formatRelativeLocale = {
    lastWeek: "MM/dd/yyyy",
    yesterday: "'Hôm qua'",
    today: "'Hôm nay'",
    other: "MM/dd/yyyy",
  };

  const locale = {
    ...vi,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  const dateTemplate = (date) => {
    if (!date) return null;
    
    // Format the date to match the format used in history
    const formattedDate = format(new Date(date.year, date.month, date.day), "P");

    // Filter all the calculations on the date
    const calculations = history.filter(
      (row) => format(row.time, "P") === formattedDate
    );

    const totalCalculations = calculations.length > 0 
      ? calculations.reduce((acc, row) => acc + Number(row.result), 0) 
      : 0;

    return (
      <div className="relative flex flex-col items-center">
        <span>{date.day}</span>
        {totalCalculations > 0 && (
          <span className="text-[0.65rem] text-green-500 font-medium">
            {totalCalculations}
          </span>
        )}
      </div>
    );
  };

  const onDelete = (item) => {
    const newHistory = history.filter(h => h.time !== item.time);
    setHistory(newHistory);
  };

  return (
    <>
      <div className="flex flex-col-reverse w-full h-full mb-5 mt-7 overflow-auto font-light text-gray-300">
      <PerfectScrollbar options={{ suppressScrollX: true }} className="h-full">
          <ul className="w-full divide-y divide-gray-700">
          {filteredHistory.map((data, index) => (
            <li className="py-1 active:bg-gray-800 transition-colors duration-200 hover:bg-gray-800" key={index}>
              <div 
                className="flex items-center space-x-4 cursor-pointer px-2" 
                onTouchStart={() => handleTouchStart(data)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(data)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTouchEnd(); }}
              >
                <div className="flex-1 min-w-16">
                  <p className="text-sm font-medium truncate text-white">
                    {format(data.time, "p") /* format to '5:20 AM*/}
                  </p>
                  <p className="text-sm text-white truncate dark:text-gray-400">
                    {formatRelative(data.time, new Date(), { locale })}
                  </p>
                </div>
                <div className="text-lg font-thin text-end tracking-wider text-operation">
                  {formatExpression(data.expression)}{" "}
                  <span className="text-white font-medium">
                    = {data.result}
                  </span>
                </div>
              </div>
            </li>
          ))}
          
          {filteredHistory.length > 0 && (
            <li className="pt-8">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-16">
                  <p className="text-lg font-medium text-white">Tổng ({filteredHistory.length})</p>
                </div>
                <div className="text-lg font-thin text-end tracking-wider">
                  <span className="font-bold text-blue-500">
                    {filteredHistory.reduce((sum, item) => sum + Number(item.result), 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-16">
                  <p className="text-lg font-medium text-white">60%</p>
                </div>
                <div className="text-lg font-thin text-end tracking-wider">
                  <span className="font-bold text-blue-500">
                    {(filteredHistory.reduce((sum, item) => sum + Number(item.result), 0) * 0.6).toFixed(2)}
                  </span>
                </div>
              </div>
            </li>
          )}
        </ul>
        </PerfectScrollbar>
      </div>

      <Calendar
        value={dates}
        onChange={(e) => setDates(e.value)}
        selectionMode="range"
        maxDate={new Date()}
        readOnlyInput
        hideOnRangeSelection
        dateTemplate={dateTemplate}
        showIcon
        pt={{
          input: { root: "text-center" },
        }}
      />

      <DeleteDialog
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        onDelete={onDelete}
        selectedItem={selectedItem}
        formatExpression={formatExpression}
      />
    </>
  );
}

export default Recent;
