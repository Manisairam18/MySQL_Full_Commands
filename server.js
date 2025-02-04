const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Create an instance of Express app
const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Configuration
const db = mysql.createConnection({
  // host: "127.0.0.1",
  // user: "root",
  // password: "password",
  // database: "technest",
  // port: 3306 // Your MySQL database name
  host: "localhost",
  user: "jeyanr_TechNest",
  password: "TechNest@Quexi",
  database: "jeyarnr_quexi",
  port: 3306 // Your MySQL database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// Create tables if not exists
const createFormDataTableQuery = `
  CREATE TABLE IF NOT EXISTS form_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    customerType VARCHAR(50) NOT NULL
  );
`;

const createFormEnclaveTableQuery = `
  CREATE TABLE IF NOT EXISTS form_enclave (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL
  );
`;

db.query(createFormDataTableQuery, (err) => {
  if (err) {
    console.error("❌ Error creating table 'form_data':", err.message);
  } else {
    console.log("✅ Table 'form_data' is ready.");
  }
});

db.query(createFormEnclaveTableQuery, (err) => {
  if (err) {
    console.error("❌ Error creating table 'form_enclave':", err.message);
  } else {
    console.log("✅ Table 'form_enclave' is ready.");
  }
});

// Route to handle form submission for form_data
app.post("/formData", (req, res) => {
  const { Name, phone, customerType } = req.body;

  if (!Name || !phone || !customerType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const insertQuery = "INSERT INTO form_data (Name, phone, customerType) VALUES (?, ?, ?)";
  const values = [Name, phone, customerType];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("❌ Error saving form data:", err.message);
      return res.status(500).json({ message: "Error saving form data." });
    }
    console.log("✅ Form data saved:", result);
    res.status(201).json({ message: "Form data saved successfully." });
  });
});

// Route to handle form submission for form_enclave
app.post("/formEnclave", (req, res) => {
  const { Name, phone } = req.body;

  if (!Name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  const insertQuery = "INSERT INTO form_enclave (Name, phone) VALUES (?, ?)";
  const values = [Name, phone];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("❌ Error saving form enclave data:", err.message);
      return res.status(500).json({ message: "Error saving form enclave data." });
    }
    console.log("✅ Form enclave data saved:", result);
    res.status(201).json({ message: "Form enclave data saved successfully." });
  });
});

// Default error handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
