var IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
var Counter = require('../models/counter.model');
var Product = require('../models/product.model.js');

exports.create = function(req, res) {

  var form = new IncomingForm();

  form.parse(req, function(err, fields, files) {
    file = files.file
    product = fields;

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

            // FILE UPLOAD
            if (file != null) {
              console.log("Uploading..")
  
              var imageName = file.name;
              imageName = imageName.replace(/\s/g, '_');
  
              var oldPath = file.path;
              var newPath = 'public/img/' + imageName;
              product.pic = imageName;
  
              fs.readFile(oldPath, function (err, data) {
                fs.writeFile(newPath, data, function (err) {
                  if (err) throw err;
                  console.log("File uploaded to: " + newPath);
                })
              })
            } else {
              // set default name
              product.pic = 'default.jpg';
            }
  
            Product.create(product, function (err, product) {
              if (err) throw err;
              console.log('Product created!');
      
              res.send(product);
            });
            
          }
        });
      }
    });
  })
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

  var form = new IncomingForm();

  form.parse(req, function(err, fields, files) {
    var file = files.file
    var newProduct = fields;

    Product.findOne({ idProduct: req.params.productId }, function (err, product) {
      if (err) {
        res.status(500).send({
            message: "Could not retrieve product with id " + req.params.productId
        });
      } else {
        product.idCategory = newProduct.idCategory;
        product.name = newProduct.name;
        product.description = newProduct.description;
        product.price = newProduct.price;
        
        // FILE UPLOAD
        if (file != null) {
          console.log("Uploading..")

          var imageName = file.name;
          imageName = imageName.replace(/\s/g, '_');

          var oldPath = file.path;
          var newPath = 'public/img/' + imageName;
          product.pic = imageName;

          fs.readFile(oldPath, function (err, data) {
            fs.writeFile(newPath, data, function (err) {
              if (err) throw err;
              console.log("File uploaded to: " + newPath);
            })
          })
        } else {
          // set default name
          product.pic = 'default.jpg';
        }
  
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

  })

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

exports.upload = function (req, res) {
  var form = new IncomingForm();
  
  form.on('file', (field, file) => {
    var oldPath = file.path;
    var newPath = 'public/img/' + file.name;

    fs.readFile(oldPath, function (err, data) {
      fs.writeFile(newPath, data, function (err) {
        if (err) throw err;
        console.log("File uploaded to: " + newPath);
      })
    })

  });

  form.on('end', () => {
    res.json();
  });

  form.parse(req);
}
