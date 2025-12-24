const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Test route (browser or Android)
app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

// Android app endpoint
app.get("/mirror", (req, res) => {
  console.log("Mirror request received from Android");
  res.status(200).json({
    status: "ok",
    message: "Android connected to Railway backend"
  });
});

// Future POST data from phone
app.post("/mirror", (req, res) => {
  console.log("Data from phone:", req.body);
  res.status(200).json({
    received: true,
    data: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
