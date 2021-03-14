const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


var app = express();  
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gatorcom', {
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

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('../frontend/build'))
}

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));
