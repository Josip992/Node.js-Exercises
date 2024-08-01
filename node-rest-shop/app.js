const express = require('express');
const app = express();


app.use('/favicon.ico', (req, res) => res.status(204).end()); //next middleware wont log favicon but  / 

app.use((req, res, next)=>{  //app.use is middlware, preprocessing
    console.log(`Request URL: ${req.url}`);
    res.status(200).json({
        message: 'Everything good!'
    });
});

module.exports = app;