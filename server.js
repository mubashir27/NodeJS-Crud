const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnect');
const dotenv = require('dotenv').config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use('/contacts', require('./routes/contactRoute'));
app.use('/user', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running in post ${port} `);
});
