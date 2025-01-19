import React, { useContext, useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { DeleteDialog } from '../components/DeleteDialog';

const ResultsContext = React.createContext();

function ResultsProvider({ children }) {
  const [history, setHistory] = useState([]);

  return (
    <ResultsContext.Provider value={{ history, setHistory }}>
      {children}
      <DeleteDialog
        // ... other props ...
        history={history}
      />
    </ResultsContext.Provider>
  );
}

export default ResultsProvider; 