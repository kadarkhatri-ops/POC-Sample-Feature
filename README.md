# Strata Reports Extension

Node.js + React reporting module for the Strata PHP app. Shares the same MySQL database and includes a sales table with monthly reporting.

## Setup

### 1. Create Sales Table

Import the schema into your MySQL database:

```sql
mysql -u root -p simple_php_app < sales_schema.sql
```

Or from the MySQL CLI:
```
SOURCE C:\Kadar\practice\strata-reports\sales_schema.sql;
```

### 2. Install Node Server Dependencies

```powershell
cd C:\Kadar\practice\strata-reports\server
npm install
```

### 3. Install React Client Dependencies

```powershell
cd C:\Kadar\practice\strata-reports\client
npm install
```

## Running

### Terminal 1: Start Node API Server

```powershell
cd C:\Kadar\practice\strata-reports\server
npm start
```

The API will be available at `http://localhost:5000`

### Terminal 2: Start React Development Server

```powershell
cd C:\Kadar\practice\strata-reports\client
npm start
```

The React app will open at `http://localhost:3000`

### Terminal 3: Start PHP Application (optional, if not already running)

```powershell
cd C:\Kadar\practice\strata
php -S localhost:8000 -t .
```

## Features

- 📊 View monthly sales reports
- 📥 Download reports as CSV
- 📈 Summary statistics (total sales, transaction count, average)
- 🔗 Linked from PHP app landing page
- 💾 Shared MySQL database

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/reports/months` - Get available months
- `GET /api/reports/sales?year=2024&month=1` - Get sales by month

## Database Schema

### sales table

| Column      | Type           | Description                |
|-------------|----------------|----------------------------|
| id          | INT UNSIGNED   | Primary key                |
| sale_date   | DATE           | Date of sale               |
| amount      | DECIMAL(10,2)  | Sale amount                |
| product     | VARCHAR(255)   | Product name               |
| user_id     | INT UNSIGNED   | Foreign key to users table |
| created_at  | TIMESTAMP      | Record creation timestamp  |

## Next Steps

Access reports from the PHP app landing page (index.php) via the "Reports" link.
