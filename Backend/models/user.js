const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        username : 
        {
            type : String,
            required : [true, "Please provide username"]
        },

        password : 
        {
            type : String,
            required : [true, "Please provide password"]
        },

        roles : 
        [
            {
                type : String,
                default : "Employee"
            }
        ],

        active : 
        {
            type : Boolean,
            default : true
        }

    }
)

module.exports = mongoose.model('User', userSchema)

