const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
//
app.use(cookieParser());

//
app.use(cors());
//
app.use(express.json());

//
const PORT = process.env.PORT || 3001;
//
const db = require('./models');
//
const StockRoute = require('./routes/StockRoute');
app.use('/stock', StockRoute);
//Assign
const AssignRoute = require('./routes/AssignRoute');
app.use('/assign', AssignRoute);
// 
const loginRoute = require('./routes/LoginRoute');
app.use('/login', loginRoute);
//
db.sequelize
  .sync()
  .then(() => console.log(`server is running on port ${PORT}`))
  .catch((e) => console.log(e));
app.listen(PORT);
