
import JsonWebToken from './JsonWebToken.js';
import AuthError from '../errors/AuthError.js';

function auth() {
	return function auth(req, res, next){
		
		let verification
		
		if (!req)
		{
			return next();
		}

		let auth_header = req.get("Authorization");
			
		const [auth_scheme, token] = auth_header.split(" ");

		if (auth_scheme != "Bearer")
		{
		return next(new AuthError("Invalid header"))
		}

		try
		{
			verification = JsonWebToken.verify(token);
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
			return next(new AuthError("Invalid Token"))
		}
		
		let payload = JsonWebToken.data(token);


		console.log()
		return next();
	  };
  }

export default auth;