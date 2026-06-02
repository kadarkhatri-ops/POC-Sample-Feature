-- Add sales table to simple_php_app database
USE simple_php_app;

CREATE TABLE IF NOT EXISTS sales (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sale_date DATE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  product VARCHAR(255),
  user_id INT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_sale_date (sale_date)
);

-- Sample sales data
INSERT INTO sales (sale_date, amount, product, user_id) VALUES
('2024-01-05', 150.00, 'Laptop', 1),
('2024-01-12', 75.50, 'Mouse', 1),
('2024-02-08', 200.00, 'Monitor', 1),
('2024-02-14', 45.00, 'Keyboard', 1),
('2024-03-20', 300.00, 'Desk', 1),
('2024-04-10', 99.99, 'Chair', 1),
('2024-05-15', 120.00, 'Lamp', 1),
('2024-05-25', 180.00, 'Webcam', 1),
('2024-06-01', 50.00, 'USB Hub', 1),
('2024-06-12', 160.00, 'Monitor Stand', 1);
