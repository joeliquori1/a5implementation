const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


var app = express();  
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

const MONGODB_URI = 'mongodb+srv://joeliquori:vLPPIogLkatetBGM@gatorcomdb.k16nj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || 'mongodb://localhost/gatorcom', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!');
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//HTTP Request loggger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));
