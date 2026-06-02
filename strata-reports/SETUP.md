# Strata Reporting System

Complete reporting extension for the Strata PHP application. Features a Node.js API backend, React frontend, and shared MySQL database.

## Project Structure

```
strata-reports/
├── server/              # Node.js + Express API
│   ├── package.json
│   ├── server.js        # Main server file
│   ├── .env             # Environment config
│   └── README.md
├── client/              # React frontend
│   ├── package.json
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       └── ReportViewer.js
│   ├── public/
│   │   └── index.html
│   └── README.md
├── sales_schema.sql     # MySQL schema for sales table
└── README.md            # This file
```

## Quick Start

### Step 1: Prepare Database

Run the sales schema to create the table:

```powershell
# Using mysql CLI
mysql -u root -p simple_php_app < C:\Kadar\practice\strata-reports\sales_schema.sql
```

Or from inside MySQL:
```sql
USE simple_php_app;
SOURCE C:\Kadar\practice\strata-reports\sales_schema.sql;
```

### Step 2: Install and Start Services

**Terminal 1: Node API Server**
```powershell
cd C:\Kadar\practice\strata-reports\server
npm install
npm start
```
Runs on `http://localhost:5000`

**Terminal 2: React Frontend**
```powershell
cd C:\Kadar\practice\strata-reports\client
npm install
npm start
```
Runs on `http://localhost:3000`

**Terminal 3: PHP App (if not already running)**
```powershell
cd C:\Kadar\practice\strata
php -S localhost:8000 -t .
```
Runs on `http://localhost:8000`

## Access Points

- **PHP Login**: http://localhost:8000
- **Reports UI**: http://localhost:3000
- **API Server**: http://localhost:5000

## Features

✅ Monthly sales report generation  
✅ CSV download capability  
✅ Summary statistics (total, count, average)  
✅ Shared MySQL database with PHP app  
✅ Responsive React UI  
✅ Express API for data access  

## Configuration

Edit `server/.env` to adjust:
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL user
- `DB_PASS` - MySQL password
- `DB_NAME` - Database name
- `PORT` - API server port

## Sample Data

The `sales_schema.sql` includes sample sales data for testing. Includes transactions from January to June 2024.

## Database

### Sales Table Structure

```sql
CREATE TABLE sales (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sale_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  product VARCHAR(255),
  user_id INT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_sale_date (sale_date)
);
```

## API Documentation

### GET /api/health
Health check endpoint.

### GET /api/reports/months
Get all available months with sales data.

**Response:**
```json
{
  "success": true,
  "months": [
    {
      "year": 2024,
      "month": 6,
      "label": "June 2024"
    }
  ]
}
```

### GET /api/reports/sales?year=2024&month=6
Get sales data for a specific month.

**Query Parameters:**
- `year` (required) - Year as integer (e.g., 2024)
- `month` (required) - Month as integer 1-12 (e.g., 6)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sale_date": "2024-06-01",
      "amount": "50.00",
      "product": "USB Hub",
      "user_id": 1
    }
  ],
  "summary": {
    "totalSales": 210.00,
    "transactionCount": 2,
    "averageSale": 105.00,
    "month": "2024-06"
  }
}
```

## Next Steps

1. Ensure MySQL is running with the simple_php_app database
2. Follow the Quick Start section above
3. Navigate to http://localhost:8000 to see the login page with reports link
4. Click the reports link to view the React application
5. Generate monthly reports and download CSV files

## Troubleshooting

**API connection error:**
- Ensure Node server is running on port 5000
- Check `server/.env` credentials match your MySQL setup

**React won't load:**
- Ensure React dev server is running
- Check browser console for errors

**No data in reports:**
- Verify sales table was created: `SELECT * FROM simple_php_app.sales;`
- Check sample data was inserted during schema import
