const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'simple_php_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get sales report by month
app.get('/api/reports/sales', async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({ error: 'year and month query parameters required' });
    }

    const connection = await pool.getConnection();
    
    // Format: YYYY-MM
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    
    // Get last day of month
    const date = new Date(year, parseInt(month), 0);
    const endDate = `${year}-${String(month).padStart(2, '0')}-${date.getDate()}`;

    const [rows] = await connection.query(
      `SELECT id, sale_date, amount, product, user_id 
       FROM sales 
       WHERE sale_date BETWEEN ? AND ? 
       ORDER BY sale_date ASC`,
      [startDate, endDate]
    );

    // Calculate summary
    const summary = {
      totalSales: rows.reduce((sum, row) => sum + parseFloat(row.amount), 0),
      transactionCount: rows.length,
      averageSale: rows.length > 0 ? rows.reduce((sum, row) => sum + parseFloat(row.amount), 0) / rows.length : 0,
      month: `${year}-${String(month).padStart(2, '0')}`,
    };

    connection.release();

    res.json({
      success: true,
      data: rows,
      summary: summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sales data', details: err.message });
  }
});

// Get available months (for month selector)
app.get('/api/reports/months', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query(
      `SELECT DISTINCT 
        YEAR(sale_date) as year, 
        MONTH(sale_date) as month 
       FROM sales 
       ORDER BY year DESC, month DESC`
    );

    connection.release();

    const months = rows.map(row => ({
      year: row.year,
      month: row.month,
      label: new Date(row.year, row.month - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    }));

    res.json({ success: true, months });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch months', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Reports API running on http://localhost:${PORT}`);
});
