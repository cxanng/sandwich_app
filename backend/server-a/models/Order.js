const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id:{
        type: Number,
    },
    sandwichId: {
        type: Number,
        ref: "Sandwich",
        required: true
    },
    status: {
        type: String,
        enum: ['ordered', 'received', 'inQueue', 'ready', 'failed'],
        default: 'ordered',
        required: true
    }
});

orderSchema.plugin(AutoIncrement, {id:'order_id_seq', inc_field: 'id'});

const Order = mongoose.model('Order', orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;