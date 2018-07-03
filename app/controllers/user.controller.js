var User = require('../models/user.model')
var Token = require('../models/token.model')

exports.authenticate = function(req, res) {
  user = req.body;

  User.findOne(
    { username: user.username, password: user.password }, 
    function (err, data) {
      if (err || !data) {
        res.status(401).send({
            message: "Can't authenticate "
        });
      } else {
        var token = {
          token: makeid(),
          expire: generateExpire()
        };

        Token.create(token, function (err, token) {
          if (err) throw err;
          var jwt = token.token;

          res.json({ token: jwt })
        });
      }
    });

}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function generateExpire() {
  var today = new Date();
  today.setHours(today.getHours() + 1);
  
  return today;
}