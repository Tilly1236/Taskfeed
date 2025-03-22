import express from 'express';
import SignupInterface from './SignupInterface.js';
import SignupError from '../errors/SignupError.js';

const signup = express.Router();

signup.use(express.json());

signup.post('/', (req, res) =>{

	if (!req.body) return res.sendStatus(400)
	
	if (!req.body.username)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}

	if (!req.body.password)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}
	

	try
	{
		SignupInterface.new_user(req.body.username, req.body.password);
	}
	catch (error)
	{

		if (error instanceof SignupError)
		{
			res.set({'Content-Type': 'application/json' });
			res.status(409);
			return res.send({ status : 'ERROR', message: 'Username already is in use.' });
		}
		else
		{
			console.log(error);
			return res.status(500).send("Internal Server Error");
		}
	}

	res.set({'Content-Type': 'application/json' });
	res.status(201);
	return res.send({ status : 'Created', message: '' });

})

export default signup
