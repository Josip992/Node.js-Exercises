const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message:'GET request to /orders/'
    });
});

router.post('/', (req,res,next)=>{
    const order = {
        id: req.body.id,
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({ //successful request, resource created
        message: 'POST handler for /orders/!',
        order: order
    });
});

router.get('/:orderID', (req,res,next)=>{
    if (req.params.orderID === 5){
        res.status(200).json({
        message:'GET request to orders/5',
        id:req.params.orderID
    });
    }else{
        res.status(200).json({
            message:'GET request to orders/orderID',
            id:req.params.orderID
    })};
});

router.delete('/:orderID', (req,res,next)=>{
    res.status(200).json({
        message: 'Delted an order',
        id: req.params.orderID
    });
});

module.exports = router;