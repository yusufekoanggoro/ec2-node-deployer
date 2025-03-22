const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Dockerized Node.js on AWS! - 20:47 22/03/2025");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
