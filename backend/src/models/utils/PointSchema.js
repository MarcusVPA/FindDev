const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: { // não é o type em se, é apena uma coluna
        type: String,
        enum: ['Point'], // valor dela
        required: true, // obrigatório
    },
    coordinates: { 
        type: [Number],  // longitude e latitude nessa ordem
        required: true,
     },
})

module.exports = PointSchema;