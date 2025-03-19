import express from 'express';
import LoginInterface from './LoginInterface.js';

import LoginError from '../errors/LoginError.js';

const login = express.Router();

login.use(express.json());

login.post('/', (req, res) => {

	let query

	try
	{
		query = LoginInterface.login(req.body.username, req.body.password);
	}
	catch (error)
	{
		
		if (error instanceof LoginError)
		{
			res.set({'Content-Type': 'application/json' });
			res.status(401);
			return res.send({ status : 'ERROR', message: 'Login Infomation is wrong.' });
		}
		else
		{
			console.log(error);
			return res.status(500).send("Internal Server Error");
		}

		
	}

	res.set({'Content-Type': 'application/json' });
	res.status(200);
	return res.send({ status : 'OK', message: '' });
})


export default login;