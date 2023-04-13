//#### Imports ####
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const {diskUpload} = require('./services/googleDriveUpload')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//CORS
var corsOptions = {
    origin: "*"
  };
  app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database Sync
const db = require('./models/index');
db.sequelize.sync();

const taskRoutes = require('./routes/task.routes')
const goalRoutes = require('./routes/goal.routes')
const dashboardRoutes = require('./routes/dashboard.routes');
const attendenceRoutes = require('./routes/attendence.routes');
const authRoutes = require('./routes/auth.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const attachemntRoutes = require('./routes/attachments.routes');

app.use('/task',taskRoutes);
app.use('/goal',goalRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/attendence', attendenceRoutes);
app.use('/auth', authRoutes)
app.use('/analytics', analyticsRoutes);
app.use('/file', diskUpload.single('profile'), attachemntRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}.`);
  });
