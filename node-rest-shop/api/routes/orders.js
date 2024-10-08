const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req,res, _next)=>{
    Order.find()
    .select('-__v')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc=> {
                return {
                    quantity: doc.quantity,
                    productId: doc.productId,
                    _id: doc.id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/orders/' + doc._id
                    }

                }
            })
        }
        console.log(docs);
        res.status(200).json(response); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        }); 
    });
});

router.post('/', (req,res, _next)=>{
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save().then(result => {
        console.log(result);
        res.status(201).json({ //successful request, resource created
            message: 'Created an order!',
            createdOrder: {
                quantity: result.quantity,
                productId: result.productId,
                _id: result._id,
                request:{
                    type: 'GET',
                    url: "http://localhost:8080/orders/" + result._id
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            errror: err
        });
    });
});

router.get('/:orderID', (req,res, _next)=>{
    const id = req.params.orderID;
    Order.findById(id)
    .select('-__v')
    .exec()
    .then(doc => {  
        console.log("From database: ", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/orders'
                }
            });
        }else{
            res.status(404).json({
                message: "No entry found for requested ID!"
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:id', (req, res, _next) => {
    const id = req.params.id;
    Order.findByIdAndUpdate(id, { $set: req.body }, { new: true})
      .then(_result => {
        console.log(req.body);
        res.status(200).json({
        message: 'Updated an order',
        request: {
            type: 'PATCH',
            url: 'http://localhost:8080/orders/' + id
        }
        });
      })     
      .catch(err => res.status(500).json({ error: err}))
});

router.delete('/:orderID', (req,res, _next)=>{
    const id = req.params.orderID;
    Order.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            result: result,
            message: "Deleted an order"
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;