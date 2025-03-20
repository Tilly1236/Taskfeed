import crypto from 'crypto'

import process from 'process'

import {Buffer} from 'node:buffer'
import AuthError from '../errors/AuthError.js';

class JsonWebToken
{

	static secret = process.env.TOKENSECRET || "generictoken"


	static signature(header, payload)
	{
		const hmac = crypto.createHmac('sha256', JsonWebToken.secret);
		hmac.update(header);
		hmac.update(payload);
		return hmac.digest('hex');
	}

	static parse(token)
	{
		let split_token = token.split(".");

		if (split_token.length != 3)
		{
			throw new AuthError("Invalid Token Format")
		}

		return split_token;


	}

	static create(payload)
	{
		let header = JSON.stringify({ "alg": "HS256", "typ" : "JWT"});

		payload = JSON.stringify(payload);

		let base_encode = Buffer.from(header, "utf8").toString("base64") + "." + Buffer.from(payload, "utf8").toString("base64");
		let sig = JsonWebToken.signature(header, payload);
		let token = base_encode + "." + sig;

		return token;
	}

	static verify(token)
	{
		let [header, payload, sig] = JsonWebToken.parse(token);

		let verify_signature = JsonWebToken.signature(Buffer.from(header, "base64").toString("utf8"), Buffer.from(payload, "base64").toString("utf8"));

		return (sig === verify_signature);
	}

	static data(token)
	{
		let [_header, payload, _sig] = JsonWebToken.parse(token)

		return Buffer.from(payload, "base64").toString("utf8")
	}
}

export default JsonWebToken;