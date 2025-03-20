
import JsonWebToken from './JsonWebToken.js';

function auth() {
	return function auth(req, res, next){
		if (req) {
		  let auth_header = req.get("Authorization")
		}
	
		next();
	  };
  }

export default auth;