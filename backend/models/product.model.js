import mongoose from "mongoose";

const sizeSchema = mongoose.Schema({
    size:{
        type:Number,
        enum:[6,7,8,9,10],
        required:true,
    },
    stock:{
    type: Number,
    required: true,
    min: 0
    }
},{ _id: false })

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
     sizes: {
    type: [sizeSchema],
    required: true
  },
    gender:{
        type:String,
        enum: ['Men', 'Women', 'Unisex'],
        default: 'Unisex', 
    },
    category:{
        type:String,
        enum: ['Casual', 'Sneaker', 'Formal', 'Sports'],
        default: 'Casual', 
    },
    brand:{
        type:String,
        enum:['Nike','Adidas', 'Puma', 'Red tape', ],
        required:true,
    },
    stock:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:true,
    },
    images:{
        type:String,
        required:true,
    }
},{ timestamps: true });

export const Product = mongoose.model('Product', productSchema);