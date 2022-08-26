const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
    
        temp: {
            type : Number,
            required: true
        },
        feels_like:{
            type : Number,
            required: true
        },
        temp_min: {
            type : Number,
            required: true
        },
        temp_max:{
            type : Number,
            required: true
        },
        pressure:{
            type : Number,
            required: true
        },
        humidity:{
            type : Number,
            required: true
        },
        sea_level:{
            type : Number,
            required: true
        },
        grnd_level:{
            type : Number,
            required: true
        },
        name:{
            type : String,
            required: true
        },
        country : {
            type : String,
            required : true
        }
})
module.exports = mongoose.model('Weather', weatherSchema)