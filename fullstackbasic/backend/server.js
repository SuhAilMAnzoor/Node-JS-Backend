import express from "express";      // Following Module JS, add "type": "module" in package.json file,

const app = express();

app.get("/", (req, res) => {
  res.send("Server is Ready");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

        // Basic Server Setup