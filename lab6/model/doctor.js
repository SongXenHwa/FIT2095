const mongoose = require('mongoose');

let doctorSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fullname: {
        firstName:{
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        }
    },
    dob: {
        type: Date,
    },
    address:{
        state: {
            type: String,
            validate: {
                validator: function(newState){
                    return newState.length > 1 && newState.length < 4;
                },
                message: 'State should be in between 2 and 3 char'
            },
            get: function(newState){
                if (newState.toUpperCase() == 'VIC'){
                    return 'Victoria';
                } else if (newState.toUpperCase() == 'NSW'){
                    return 'New South Wales';
                } else if (newState.toUpperCase() == 'QLD'){
                    return 'Queensland';
                } else if (newState.toUpperCase() == 'SA'){
                    return 'South Australia';
                } else if (newState.toUpperCase() == 'TAS'){
                    return 'Tasmania';
                } else if (newState.toUpperCase() == 'WA'){
                    return 'Western Australia';
                } else if (newState.toUpperCase() == 'NT'){
                    return 'Northern Territory';
                } else if (newState.toUpperCase() == 'ACT'){
                    return 'Australian Capital Territory';
                }
            }
        },
        suburb:{
            type: String,
        },
        street: {
            type: String,
        },
        unit: {
            type: Number,
        }
    },
    numPatients: {
        type: Number,
        validate: {
            validator: function(noPatients){
                return noPatients >= 0;
            },
            message: 'Number of patients should be a positive value'
        }
    }

});

module.exports = mongoose.model('Doctor',doctorSchema);