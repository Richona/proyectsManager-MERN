const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    dateExpire : {
        type : Date,
        default : Date.now(),
    },
    client : {
        type : String,
        required : true,
        trim : true,
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    collaborators : [
        {
            id: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
            },
            name: {
                type : String,
                trim : true,
            },
            email: {
                type : String,
                trim : true,
            }
        },
    ]
},{
    timestamps :  true
});


module.exports = mongoose.model('Project',projectSchema);