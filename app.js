require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors')
const { sequelize } = require('./models')
const { PORT } = process.env
const profileRoute = require('./route/ProfileRoute')
const videoRoute = require('./route/VideoRoute')
const userRoute = require('./route/UserRoute')
const playlistRoute = require('./route/PlaylistRoute')
const packageRoute = require('./route/PackageRoute')
const categoryRoute = require('./route/Category')
const error = require('./middleware/error')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/userRoute', userRoute)
app.use('/profile', profileRoute)
app.use('/package', packageRoute)
app.use('/video', videoRoute)
app.use('/category', categoryRoute)
app.use('/playlist', playlistRoute)

app.use("/", (req, res) => {
  return res.status(404).json({ message: "Path not found" });
});
app.use(error)
// sequelize.sync({ force: true }).then(console.log('Database Sync'))
const port = PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
