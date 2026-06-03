import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ReportViewer from './components/ReportViewer';

function App() {
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonths();
  }, []);

  const fetchMonths = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/reports/months`);
      setMonths(response.data.months);
      if (response.data.months.length > 0) {
        setSelectedMonth(response.data.months[0]);
      }
    } catch (err) {
      setError('Failed to load months');
      console.error(err);
    }
  };

  const handleFetchReport = async () => {
    if (!selectedMonth) return;

    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/reports/sales`, {
        params: {
          year: selectedMonth.year,
          month: selectedMonth.month,
        },
      });
      setReport(response.data);
    } catch (err) {
      setError('Failed to fetch report');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📊 Sales Reports</h1>
        <a href="http://localhost:8000" className="back-link">← Back to Portal</a>
      </header>

      <div className="container">
        <div className="controls">
          <select
            value={selectedMonth ? `${selectedMonth.year}-${selectedMonth.month}` : ''}
            onChange={(e) => {
              const [year, month] = e.target.value.split('-');
              const month_obj = months.find(m => m.year === parseInt(year) && m.month === parseInt(month));
              setSelectedMonth(month_obj);
            }}
            className="month-select"
          >
            {months.map((m) => (
              <option key={`${m.year}-${m.month}`} value={`${m.year}-${m.month}`}>
                {m.label}
              </option>
            ))}
          </select>
          <button onClick={handleFetchReport} disabled={loading} className="btn-fetch">
            {loading ? 'Loading...' : 'Generate Report'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {report && <ReportViewer report={report} month={selectedMonth} />}
      </div>
    </div>
  );
}

export default App;
