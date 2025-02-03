-- Switch to the 'msp' database
USE msp;

-- Create the 'form_data' table if it does not already exist
CREATE TABLE IF NOT EXISTS form_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    customerType VARCHAR(50) NOT NULL
);

-- Grant SELECT, INSERT, UPDATE, DELETE privileges to 'cpses_jepgw2c5xc' user for the 'msp' database
GRANT SELECT, INSERT, UPDATE, DELETE ON msp.* TO 'cpses_jepgw2c5xc'@'localhost';

-- Apply privilege changes
FLUSH PRIVILEGES;

-- Select all records from the 'form_data' table
SELECT * FROM form_data;

-- Display all tables in the 'msp' database
SHOW TABLES;
