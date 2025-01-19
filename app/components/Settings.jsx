"use client";
import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LuSettings2, LuCheck, LuX } from "react-icons/lu";
import { fetchFromGoogleSheets } from "../utils/googleSheets";

export default function Settings({ isOpen, onClose }) {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    onSuccess: (response) => {
      localStorage.setItem('google_access_token', response.access_token);
      setIsAuthenticated(true);
    },
    onError: () => {
      console.log('Login Failed');
    }
  });

  const handleSpreadsheetIdSubmit = () => {
    if (spreadsheetId) {
      localStorage.setItem('spreadsheet_id', spreadsheetId);
      setSyncStatus('Settings saved successfully!');
      setTimeout(() => setSyncStatus(''), 3000);
    }
  };

  const handleDownloadFromCloud = async () => {
    try {
      setIsSyncing(true);
      const sheetsData = await fetchFromGoogleSheets();
      if (sheetsData) {
        localStorage.setItem("RESULTS", JSON.stringify(sheetsData));
        setSyncStatus('Data successfully downloaded from Google Sheets!');
        // Reload the page to refresh the history
        window.location.reload();
      }
    } catch (error) {
      setSyncStatus('Failed to download data. Please try again.');
      console.error('Download error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const savedId = localStorage.getItem('spreadsheet_id');
    if (savedId) setSpreadsheetId(savedId);
    const token = localStorage.getItem('google_access_token');
    if (token) setIsAuthenticated(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white font-semibold flex items-center gap-2">
            <LuSettings2 /> Settings
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <LuX size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-white mb-2">Google Sheets Integration</h3>
            <button
              onClick={() => login()}
              className={`w-full py-2 px-4 rounded ${
                isAuthenticated 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isAuthenticated ? (
                <span className="flex items-center justify-center gap-2">
                  <LuCheck /> Connected
                </span>
              ) : (
                'Connect Google Account'
              )}
            </button>
          </div>

          <div>
            <label className="block text-white mb-2">Spreadsheet ID</label>
            <input
              type="text"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              placeholder="Enter Google Spreadsheet ID"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
          </div>

          <div>
            <button
              onClick={handleDownloadFromCloud}
              disabled={!isAuthenticated || isSyncing}
              className={`w-full py-2 px-4 rounded ${
                isAuthenticated 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-gray-600'
              } text-white ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSyncing ? 'Downloading...' : 'Download from Google Sheets'}
            </button>
            <p className="text-xs text-gray-400 mt-1 text-center">
              This will replace your local history with data from Google Sheets
            </p>
          </div>

          <button
            onClick={handleSpreadsheetIdSubmit}
            className="w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Settings
          </button>

          {syncStatus && (
            <p className="text-green-500 text-center mt-2">{syncStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
} 