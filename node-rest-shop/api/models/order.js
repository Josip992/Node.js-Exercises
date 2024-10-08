const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: Number,
    quantity: Number
});

module.exports = mongoose.model('Order', orderSchema);