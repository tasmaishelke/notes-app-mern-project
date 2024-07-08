const mongoose = require('mongoose')
const Autoincrement = require('mongoose-sequence')(mongoose)
const noteSchema = new mongoose.Schema(
    {
        user : 
        {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User'
        },

        title :
        {
            type : String,
            required : true
        },

        text :
        {
            type : String,
            required : true
        },

        completed : 
        {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true 
    }
)

noteSchema.plugin(Autoincrement, 
    {
        inc_field : 'ticket',
        id : 'ticketNums',
        start_seq : 100
    }
)

module.exports = mongoose.Model('Note', noteSchema)