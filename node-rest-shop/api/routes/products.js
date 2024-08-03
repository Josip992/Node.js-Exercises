const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'GET handler for /products/'
    });
}); 

router.post('/', (req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'POST handler for /products/!',
        createdProduct: product
    })
});

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    if(id === '5'){
        res.status(200).json({
            message: 'displaying products with id 5',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'All good',
            id: id
        });
    }
});

router.patch('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message:'Patch req to update product',
        id: id
    })
});

router.delete('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    res.status(200).json({
        message:'Delete req for a product',
        id: id
    })
});

module.exports = router;