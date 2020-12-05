const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    generalId:{
        type:String
    },
    name:{
        type:String
    },
    image:{
        type:String
    },
    email:{
        type:String
    }
})

mongoose.model('client',clientSchema)