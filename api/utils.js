function requireUser(req, res, next) {
    if (!req.user) {
      res.status(401)
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.user.admin) {
        res.status(401)
        next({
          name: "MissingAdminAuthorizationError",
          message: "You are not authorized to perform this action"
        });
      }
      next();
}
    
module.exports = { requireUser, requireAdmin };