import express from 'express';

import LoginInterface from './LoginInterface.js';

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
		console.log(error)
		res.status(500).send("Internal Server Error")
	}

	switch (query)
	{
		case 1:
			res.set({'Content-Type': 'application/json' });
			res.status(200)
			res.send({ status : 'OK', message: '' })
			break;
		case -1:
			res.set({'Content-Type': 'application/json' })
			res.status(401)
			res.send({ status : 'ERROR', message: 'Login Infomation is wrong.' })
			break;
	}

	res.end();
})


export default login;