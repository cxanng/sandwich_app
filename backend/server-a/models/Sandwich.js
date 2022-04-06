const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const {toppingSchema} = require('./Topping');
const Schema = mongoose.Schema;

const sandwichSchema = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        unique: true
    },
    toppings: [ toppingSchema ],
    breadType: {
        type: String,
        enum: ['oat', 'rye', 'wheat'],
        default: 'oat',
        required: true
    }
});

sandwichSchema.plugin(AutoIncrement, {id:'sandwich_id_seq', inc_field: 'id'});

const Sandwich = mongoose.model('Sandwich', sandwichSchema);

exports.sandwichSchema = sandwichSchema;
exports.Sandwich = Sandwich;