const {resolve} = require('path');
const express = require('express');
const compression = require('compression');
const passport = require('../utils/auth');
const isAuthenticated = require('../utils/isAuthenticated');
const cookieSession = require('cookie-session');

const clientBuildPath = resolve(__dirname, '..', '..', 'client');

module.exports = function setup(app) {
  // Initializes the passport session
  app.use(cookieSession({ secret: process.env.TROVEUIOIDC_SECRET })); // session secret
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/", isAuthenticated);
  // Auth routes
  app.get("/auth", passport.authenticate("oidc"));
  app.get(
   "/auth/cb",
   passport.authenticate("oidc", {
     successReturnToOrRedirect: "/",
     failureRedirect: "/login"
    })
  );


  app.use(compression());
  app.use('/', express.static(clientBuildPath));
  app.use('/health', (req, res) => res.json({ description: "Basic React Application with ES2015, Express.js, and Webpack 4", status: "UP" }));
  app.use('/login', (req, res) => res.json({ Error: "Application was not able to authenticate logged in user." }));

  // all other requests be handled by UI itself
  app.get('*', (req, res, next) => {
    if (req.url.includes('/api')) return next();
    /** This is to make sure the client router will still handle routing on page refresh */
    res.sendFile(resolve(clientBuildPath, 'index.html'));
  });
};
