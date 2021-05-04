const express = require("express");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
  return res.status(404).json({ message: "Path not found" });
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
