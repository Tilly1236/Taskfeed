
import JsonWebToken from './JsonWebToken.js';
import AuthError from '../errors/AuthError.js';

/**
 * Middleware to handle authentication using JSON webtokens
 * @returns 
 */
function authentication() {
	return function auth(req, res, next){
		
		let verification
		
		if (!req)
		{
			return res.sendStatus(401)
		}

		let auth_header = req.get("Authorization");

		if (!auth_header)
		{
			return res.sendStatus(401)
		}
			
		const [auth_scheme, token] = auth_header.split(" ");

		if (auth_scheme != "Bearer")
		{
		return res.status(400).send("Invalid header");
		}

		try
		{
			verification = JsonWebToken.verify_signature(token);
		} catch (error)
		{
			if (error instanceof AuthError)
			{
				return res.status(400).send("Invalid header");
			}
			else
			{
				console.log(error);
				return res.status(500).send("Internal Server Error");
			}
		}

		if (!verification)
		{
			return res.status(401).send("Invalid Token");
		}
		
		// let header = verification.header;
		let payload = verification.payload;

		// let current_time_seconds = Math.floor(Date.now() / 1000);


		res.locals.id = payload.id
		res.locals.username = payload.username

		return next();
	  };
  }

export default authentication;