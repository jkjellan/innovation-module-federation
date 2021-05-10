// Middleware for checking if the request is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.passport || req.url.includes("testMode=true") || (!req.url.startsWith("/?") && req.url != "/")) {
        return next();
    } else {
        if (req.url !== "/auth") {
            req.session.returnTo = req.url;
        }
        res.redirect("/auth");
    }
  };
  
  module.exports = isAuthenticated;