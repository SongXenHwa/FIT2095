const mongoose = require('mongoose');

let patientSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true
    },
    doctorid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    age:{
        type: String,
        validate: {
            validator: function(newAge){
                return newAge >= 0 && newAge <= 120;
            },
            message: 'Age must be a number between 0 and 120'
        }
    },
    dov: {
        type: Date,
        default: Date.now()
    },
    
    caseDesc: {
        type: String,
        validate: {
            validator: function(newCase){
                return newCase.length >= 10;
            },
            message: 'Case description must be at least 10 char long'
        }
    },
});


module.exports = mongoose.model('Patient',patientSchema);