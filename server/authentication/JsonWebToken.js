import crypto from 'crypto'

import process from 'process'

import {Buffer} from 'node:buffer'
import AuthError from '../errors/AuthError.js';

/**
 * Helper function to create json webtokens
 */
class JsonWebToken
{

	static secret = process.env.TOKENSECRET || "generictoken"

	/**
	 * Creates cryptographic signature with a secret
	 * @param {*} header 
	 * @param {*} payload 
	 * @returns {String} signature
	 */
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

	/**
	 * Creates a JSON web token.
	 * @param {*} payload - User infomation to be included with token payload
	 * @returns {String} token
	 */
	static create(payload)
	{
		let header = JSON.stringify({ "alg": "HS256", "typ" : "JWT"});

		let current_time_seconds = Math.floor(Date.now() / 1000);

		let exp_time = current_time_seconds + 3600;

		payload["iat"] = current_time_seconds;

		payload["exp"] = exp_time;

		payload = JSON.stringify(payload);

		let base_encode = Buffer.from(header, "utf8").toString("base64") + "." + Buffer.from(payload, "utf8").toString("base64");
		let sig = JsonWebToken.signature(header, payload);
		let token = base_encode + "." + sig;

		return token;
	}

	/**
	 * Verifies the token if its created by the server
	 * @param {*} token - Client token to be verified 
	 * @returns JSON object with header and payload.
	 */
	static verify_signature(token)
	{
		let [header, payload, sig] = JsonWebToken.parse(token);

		let header_decode = Buffer.from(header, "base64").toString("utf8");;
		let payload_decode = Buffer.from(payload, "base64").toString("utf8");

		let verify_signature = JsonWebToken.signature(header_decode, payload_decode);

		if( verify_signature != sig)
		{
			return null;
		}

		return { "header": JSON.parse(header_decode), "payload" : JSON.parse(payload_decode)}
	}


}

export default JsonWebToken;