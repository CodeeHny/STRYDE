import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
        lowercase:true,
    },
    phone:{
        type:Number,
        require:true,
        unique:true,
        maxlenght:10,
    },
    address:{
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
})

export const User = mongoose.model('User', userSchema)

// username ---
// email ---
// password --
// mobile number  ----
// address
// isAdmin
// orders
// cart