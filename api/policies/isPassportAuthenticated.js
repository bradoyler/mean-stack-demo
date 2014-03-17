
// use passport to check if we're authenticated
module.exports = function(req, res, next) {

  if (req.isAuthenticated())
    return next();

  if (req.wantsJSON)
    return res.forbidden('You are not authorized to perform this action.');

  req.flash('error', 'You must login first');
  res.redirect('/login');
};
