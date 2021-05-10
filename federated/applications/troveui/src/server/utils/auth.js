const passport = require("passport");
const { Issuer, Strategy } = require("openid-client");

const url = {
	auth: {
		production: "https://lmidp.libertymutual.com",
		test: "https://test-lmidp.libertymutual.com",
		local: "https://test-lmidp.libertymutual.com"
	},
	authCallback: {
		production: "https://trove-ui-v0-production.prod.uscm.libertyec.com/auth/cb",
		test: "https://trove-ui-v0-develop.np.uscm.libertyec.com/auth/cb",
		local: "https://localhost:8081/auth/cb"
	}
}

const pingIssuer = new Issuer({
  issuer: url.auth[process.env.ETS_DEPLOY_ENV],
  authorization_endpoint:
  url.auth[process.env.ETS_DEPLOY_ENV] + "/as/authorization.oauth2",
  token_endpoint: url.auth[process.env.ETS_DEPLOY_ENV] + "/as/token.oauth2",
  userinfo_endpoint: url.auth[process.env.ETS_DEPLOY_ENV] + "/idp/userinfo.openid",
  jwks_uri: url.auth[process.env.ETS_DEPLOY_ENV] + "/pf/JWKS"
});

const client = new pingIssuer.Client({
  client_id: process.env.TROVEUIOIDC_ID,
  client_secret: process.env.TROVEUIOIDC_SECRET
});

const params = {
	scope: "openid profile", // scope of information we want to get from the Resource Owner
	redirect_uri: url.authCallback[process.env.ETS_DEPLOY_ENV]
  };
  
// Defining the strategy to authenticate user and get user info 
passport.use(
	"oidc",
	new Strategy({ client, params }, (tokenset, userinfo, done) => {
	  return client.userinfo(tokenset.access_token).then(user_profile => {
		// The above line uses the access token to get the user information from the
		// Authorization Server (ping) and returns it in the user_profile argument
  
		const profile = {
		  id: userinfo.sub,
		  first_name: userinfo.firstName,
		  last_name: userinfo.lastName,
		  full_name: `${userinfo.firstName} ${userinfo.lastName}`,
		  email: userinfo.mail,
		  groups: userinfo.groups
		};

		console.log("Authenticating user " + profile.full_name + " - " + profile.id);
		console.log(profile);
  
		return done(null, profile);
	  });
	})
  );
  
// Serializes the user information into the request session passport user object
passport.serializeUser((user, done) => {
done(null, user);
});

// Deserializes the user information from the request session passport user object
passport.deserializeUser((user, done) => {
done(null, user);
});

module.exports = passport;
