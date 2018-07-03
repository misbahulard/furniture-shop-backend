var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    idProduct: {
        type: Number,
        required: true
    },
    idCategory: Number,
    name: {
        type: String,
        require: true
    },
    description: String,
    price: Number,
    pic: String
}, {
    timestamps: true
});

productSchema.query.byCategory = function (id) {
    return this.where({ idCategory: id })
}

module.exports = mongoose.model('Product', productSchema);
