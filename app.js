require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')
const { sequelize } = require('./models')
const { PORT } = process.env

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", (req, res) => {
  return res.status(404).json({ message: "Path not found" });
});

sequelize.sync({ force: true }).then(console.log('Database Sync'))
const port = PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
