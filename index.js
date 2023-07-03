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
const ReceiptRoute = require('./routes/ReceiptRoute');
app.use('/receipt', ReceiptRoute);
//
const loginRoute = require('./routes/LoginRoute');
app.use('/login', loginRoute);
//
db.sequelize
  .sync()
  .then(() => console.log(`server is running on port ${PORT}`))
  .catch((e) => console.log(e));
app.listen(PORT);
