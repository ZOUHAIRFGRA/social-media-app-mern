const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static('public'));

if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: 'backend/config/config.env' });
}
const user = require('./routes/userRoute');
app.use('/api/v1', user);
app.use(errorMiddleware);
module.exports = app;