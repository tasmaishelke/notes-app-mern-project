const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function hashedPassword()
{
    const salt = await bcrypt.salt(10)
    this.password = await bcrypt.hash(this.password, salt)
}) 

userSchema.methods.comparePassword = async function(receivedPassword)
{
    const isMatch = await bcrypt.compare(receivedPassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema)

