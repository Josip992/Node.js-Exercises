const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req,res,next)=>{
    Order.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
});

router.post('/', (req,res,next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result => {
        console.log(result);
        res.status(201).json({ //successful request, resource created
            message: 'POST handler for /orders/',
            createdOrder: order
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            errror: err
        });
    });
});

router.get('/:orderID', (req,res,next)=>{
    const id = req.params.orderID;
    Order.findById(id)
    .exec()
    .then(doc => {  
        console.log("From database: ", doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: "No entry found for requested ID!"
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errror: err
        });
    });
});

router.delete('/:orderID', (req,res,next)=>{
    res.status(200).json({
        message: 'Delted an order',
        id: req.params.orderID
    });
});

module.exports = router;