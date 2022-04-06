const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number
    }
});
const Topping = mongoose.model('Topping', toppingSchema);

exports.toppingSchema = toppingSchema;
exports.Topping = Topping;