module.exports = function(app) {
  var user = require('../controllers/user.controller.js');

  app.post('/users/auth', user.authenticate);
}
