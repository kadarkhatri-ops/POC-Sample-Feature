import React from 'react';
import '../App.css';

function ReportViewer({ report, month }) {
  const handleDownload = () => {
    const csv = generateCSV(report.data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales-report-${month.year}-${String(month.month).padStart(2, '0')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = (data) => {
    let csv = 'Date,Product,Amount\n';
    data.forEach(row => {
      csv += `${row.sale_date},${row.product || 'N/A'},${row.amount}\n`;
    });
    return csv;
  };

  return (
    <div className="report-container">
      <div className="summary">
        <h2>{month.label} Sales Report</h2>
        <div className="summary-stats">
          <div className="stat-card">
            <span className="stat-label">Total Sales</span>
            <span className="stat-value">${report.summary.totalSales.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Transactions</span>
            <span className="stat-value">{report.summary.transactionCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Average Sale</span>
            <span className="stat-value">${report.summary.averageSale.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {report.data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.sale_date}</td>
                <td>{row.product || '-'}</td>
                <td>${parseFloat(row.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleDownload} className="btn-download">
        📥 Download CSV
      </button>
    </div>
  );
}

export default ReportViewer;
