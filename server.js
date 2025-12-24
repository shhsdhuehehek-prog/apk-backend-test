const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let lastPing = "No device connected";
let messageToPhone = "Hello from Railway 👋";

// Phone sends status
app.post("/ping", (req, res) => {
  lastPing = new Date().toISOString();
  res.json({ status: "ok" });
});

// Phone fetches message
app.get("/message", (req, res) => {
  res.json({ message: messageToPhone });
});

// Dashboard (browser)
app.get("/", (req, res) => {
  res.send(`
    <h2>Android Device Dashboard</h2>
    <p>Last ping: ${lastPing}</p>
    <form method="POST" action="/set-message">
      <input name="msg" placeholder="Message to phone"/>
      <button>Send</button>
    </form>
  `);
});

// Update message
app.post("/set-message", express.urlencoded({ extended: true }), (req, res) => {
  messageToPhone = req.body.msg;
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
