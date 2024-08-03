const express = require('express');
const app = express();
const morgan = require('morgan'); 
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products'); 
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*'); //give access to any client to get data from the server
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){ //method which gives us access req http type used
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');//browser always sends options req when sending a http req
        return res.status(200).json({});
    }
    next();
});

app.use('/favicon.ico', (req, res) => res.status(204).end()); //next middleware wont log favicon but  / 

app.use('/products', productRoutes); //route forwarding
app.use('/orders', orderRoutes); 

app.use((req,res,next)=>{
    const error = new Error('Route not found');
    error.status = 404;
    next(error); //forward err req
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    }); //error status from previous middleware or 500 for other errors from the app
});

module.exports = app;