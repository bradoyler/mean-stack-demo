
var passport = require('passport');

var AuthController = {

  login: function (req,res) {
    res.view({ message: req.flash('error') });
  },

  loginProcess: function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
      console.log('user:', user, err, info);
      if (err) return next(err);
      if (!user) {
        return res.view('auth/login', {
          username: req.body.username,
          message: info.message
        });
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.redirect('/profile');
      });
    })(req, res, next);
  },

  logout: function(req,res) {
    req.logout();
    res.redirect('/');
  },

  profile: function(req, res) {

    User.findOne(1).done(function(err, user) {
       console.log('user:', user.phone);
        res.view({phone:user.phone});
    });
  },

  updateProfile: function(req, res) {

      User.findOne(1).done(function(err, user) {
        user.email = 'foo.bar@gmail.com';
        user.phone = req.param('phone');
        console.log('user', user);
        user.save(function(err) {
           console.log('saved:: ', user);
        });

     });

     res.redirect('/');
    }

};

module.exports = AuthController;