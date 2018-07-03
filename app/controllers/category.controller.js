var Category = require('../models/category.model.js');
var Counter = require('../models/counter.model');

exports.create = function(req, res) {

  category = req.body;

  Counter.findOne({ name: "categories" }, function (err, counter) {
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
          category.idCategory = data.value;
  
          Category.create(category, function (err, category) {
            if (err) throw err;
            console.log('Category created!');
    
            var id = category.id;
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });
            res.end('Added the category with id ' + id);
          });
          
        }
      });
    }
    });
}

exports.findAll = function(req, res) {
    Category.find(function(err, categories) {
      if (err) {
        res.status(500).send({
          message: "Some error occured while retrieving categories."
        });
      } else {
        res.send(categories);
      }
    });
}

exports.findOne = function (req, res) {
  Category.findOne({ idCategory: req.params.categoryId }, function (err, data) {
    if (err) {
      res.status(500).send({
        message: "Could not retrieve category with id " + req.params.categoryId
      });
    } else {
      res.send(data);
    }
  });
}

exports.update = function (req, res) {
  Category.findOne({ idCategory: req.params.categoryId }, function (err, category) {
    if (err) {
      res.status(500).send({
          message: "Could not retrieve category with id " + req.params.categoryId
      });
    } else {
      category.category = req.body.category;
      category.description = req.body.description;

      category.save(function (err, data) {
        if (err) {
          res.status(500).send({
            message: "Could not update category with id " + req.params.categoryId
          });
        } else {
          res.send(data);
        }
      });
    }
  });
}

exports.delete = function (req, res) {
  Category.remove({ idCategory: req.params.categoryId }, function (err, data) {
    if (err) {
      res.status(500).send({
        message: "Could not delete category with id " + req.params.categoryId
      });
    } else {
      res.send({
        message: "Category deleted successfully!"
      });
    }
  });
}
