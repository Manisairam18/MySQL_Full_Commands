const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { Client } = require("ssh2");
const fs = require("fs");

// Create an Express app
const app = express();
app.use(express.json());
app.use(cors());

// SSH Configuration
const sshConfig = {
  host: "server192.web-hosting.com",
  port: 21098,
  username: "jeyanr",
  password: "HhB!ql.+P5?x",
  privateKey: fs.readFileSync("C:/Users/erman/.ssh/id_rsa")
};

// MySQL Configuration
const mysqlConfig = {
  host: "127.0.0.1", // MySQL server address
  user: "jeyanr_MSP_hari", // MySQL username
  password: "123as37jojo48#", // MySQL password
  database: "jeyanr_MSP_DB" // MySQL database name
};

// SSH Client Setup
const sshClient = new Client();

sshClient
  .on("ready", () => {
    console.log("✅ SSH Connection established.");

    // Forward MySQL port through SSH
    sshClient.forwardOut(
      "127.0.0.1",
      3306,
      "127.0.0.1",
      3306,
      (err, stream) => {
        if (err) {
          console.error("❌ Error forwarding port:", err.message);
          return;
        }

        // Connect to MySQL using the SSH tunnel
        const db = mysql.createConnection({
          ...mysqlConfig,
          stream: stream
        });

        db.connect(err => {
          if (err) {
            console.error("❌ MySQL Connection failed:", err.message);
            return;
          }
          console.log("✅ Connected to MySQL through SSH tunnel.");

          // Ensure the `form_data` table exists
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS form_data (
              id INT AUTO_INCREMENT PRIMARY KEY,
              Name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              phone VARCHAR(50) NOT NULL,
              customerType VARCHAR(50) NOT NULL
            );
          `;
          db.query(createTableQuery, (err, result) => {
            if (err) {
              console.error("❌ Error creating table:", err.message);
            } else {
              console.log("✅ Table 'form_data' is ready.");
            }
          });

          // Route to handle form submissions
          app.post("/FormData", (req, res) => {
            const { Name, email, phone, customerType } = req.body;

            if (!Name || !email || !phone || !customerType) {
              return res.status(400).json({
                message: "Name, email, phone, and customerType are required."
              });
            }

            const insertQuery =
              "INSERT INTO form_data (Name, email, phone, customerType) VALUES (?, ?, ?, ?)";
            const values = [Name, email, phone, customerType];

            db.query(insertQuery, values, (err, result) => {
              if (err) {
                console.error("❌ Error saving form data:", err.message);
                return res
                  .status(500)
                  .json({ message: "Error saving form data." });
              }
              console.log("✅ Form data saved:", result);
              res
                .status(201)
                .json({ message: "Form data saved successfully." });
            });
          });

          // Start the Express server
          const PORT = 3000;
          app.listen(PORT, () =>
            console.log(`🚀 Server running on port ${PORT}`)
          );
        });
      }
    );
  })
  .on("error", err => {
    console.error("❌ SSH Connection error:", err.message);
  })
  .on("close", () => {
    console.log("🔒 SSH Connection closed.");
  });

// Connect the SSH Client
sshClient.connect(sshConfig);
