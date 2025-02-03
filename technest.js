const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Create an instance of Express app
const app = express();
app.use(express.json());
app.use(cors());

// MySQL Database Configuration
const db = mysql.createConnection({
  // host: "localhost", // Change if using a remote database
  // user: "keelamathur", // Your MySQL username
  // password: "Keelamathur@Msp", // Your MySQL password
  // database: "jeyanr_MSP",
  // port: 3306 // Your MySQL database name
  host: "localhost", // Change if using a remote database
  user: "keelamathur", // Your MySQL username
  password: "Keelamathur@Msp", // Your MySQL password
  database: "jeyanr_MSP",
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

// Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS form_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    customerType VARCHAR(50) NOT NULL
  );
`;
db.query(createTableQuery, err => {
  if (err) {
    console.error("❌ Error creating table:", err.message);
  } else {
    console.log("✅ Table 'form_data' is ready.");
  }
});

// Route to handle form submission
app.post("/formData", (req, res) => {
  const { Name, email, phone, customerType } = req.body;

  if (!Name || !email || !phone || !customerType) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const insertQuery =
    "INSERT INTO form_data (Name, email, phone, customerType) VALUES (?, ?, ?, ?)";
  const values = [Name, email, phone, customerType];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("❌ Error saving form data:", err.message);
      return res.status(500).json({ message: "Error saving form data." });
    }
    console.log("✅ Form data saved:", result);
    res.status(201).json({ message: "Form data saved successfully." });
  });
});

// Default error handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
