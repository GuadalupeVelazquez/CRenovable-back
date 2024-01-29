const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category:String,
    masInfo:String,
    extra:String,
})

const ProductModel = mongoose.model('products',ProductSchema)

module.exports = ProductModel