const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/', (req,res, _next)=>{
    Product.find()
    .select('-__v')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8080/products/' + doc._id
                    }
                }
            })
        };
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

router.post('/', (req,res,_next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created a product!',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:8080/products/" + result._id
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productId', (req,res,_next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select('-__v')
    .exec()
    .then(doc => {  
        console.log("From database: ", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8080/products'
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
            errror: err
        });
    });
});

router.patch('/:id', (req, res, _next) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true})
      .then(_result => {
        console.log(req.body);
        res.status(200).json({
        message: 'Updated a product',
        request: {
            type: 'PATCH',
            url: 'http://localhost:8080/products/' + id
        }
        });
      })     
      .catch(err => res.status(500).json({ error: err}))
});


router.delete('/:productId', (req,res, _next)=>{
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            result: result,
            message: "Deleted a product"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;