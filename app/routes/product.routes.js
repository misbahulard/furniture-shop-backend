module.exports = function(app) {
    var products = require('../controllers/product.controller.js');

    app.post('/products', products.create);
    app.get('/products', products.findAll);
    app.get('/products/search/:query', products.search)
    app.get('/products/category/:idCategory', products.findByName)
    app.get('/products/:productId', products.findOne);
    app.put('/products/:productId', products.update);
    app.delete('/products/:productId', products.delete);
}
