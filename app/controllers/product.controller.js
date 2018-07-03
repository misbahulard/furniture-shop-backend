var Counter = require('../models/counter.model');
var Product = require('../models/product.model.js');

exports.create = function(req, res) {

  product = req.body;

  Counter.findOne({ name: "products" }, function (err, counter) {
    if (err) {
      console.log("Error: Can't get next sequence");
      res.send("Error: Can't get next sequence");
    } else {
      counter.value += 1;

      counter.save(function (err, data) {
        if (err) {
          console.log("Error: Can't update next sequence");
          res.send("Error: Can't update next sequence");
        } else {
          console.log("Success update next sequence: " + data.value);
          product.idProduct = data.value;

          Product.create(product, function (err, product) {
            if (err) throw err;
            console.log('Product created!');
    
            var id = product.idProduct;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the product with id ' + id);
          });
          
        }
      });
    }
  });
  
}

exports.findAll = function(req, res) {
  Product.find(function(err, products) {
    if (err) {
      res.status(500).send({
          message: "Some error occured while retrieving products."
      });
    } else {
      res.send(products);
    }
  });
}

exports.findByName = function (req, res) {
  Product.find().byCategory(req.params.idCategory).exec(function (err, data) {
    if (err) {
      res.status(500).send({
          message: "Could not retrieve product with category id " + req.params.idCategory
      });
    } else {
      res.send(data);
    }
  })
}

exports.findOne = function (req, res) {
  Product.findOne({ idProduct: req.params.productId }, function (err, data) {
    if (err) {
      res.status(500).send({
          message: "Could not retrieve product with id " + req.params.productId
      });
    } else {
      res.send(data);
    }
  });
}

exports.update = function (req, res) {
  Product.findOne({ idProduct: req.params.productId }, function (err, product) {
    if (err) {
      res.status(500).send({
          message: "Could not retrieve product with id " + req.params.productId
      });
    } else {
      product.idCategory = req.body.idCategory;
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.pic = req.body.pic;

      product.save(function (err, data) {
        if (err) {
            res.status(500).send({
              message: "Could not update product with id " + req.params.productId
            });
        } else {
          res.send(data);
        }
      });
    }
  });
}

exports.delete = function (req, res) {
  Product.remove({ idProduct: req.params.productId }, function (err, data) {
    if (err) {
      res.status(500).send({
        message: "Could not delete product with id " + req.params.productId
      });
    } else {
      res.send({
        message: "Product deleted successfully!"
      });
    }
  });
}

exports.search = function (req, res) {
  Product.find({ "name": { "$regex": req.params.query, "$options": "i" } }, function (err, data) {
    if (err) {
      res.status(500).send({
        message: "Could not find product"
      })
    } else {
      res.send(data);
    }
  });
}
