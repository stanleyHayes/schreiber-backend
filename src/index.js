const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const useragent = require('express-useragent');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(value => {
    console.log(`Connected to mongodb using database name ${value.connection.db.databaseName}`);
}).catch(error => {
    console.log(`Error: ${error.message}`);
});


const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(useragent.express());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Connected to server in ${process.env.NODE_ENV} on port ${PORT}`);
});