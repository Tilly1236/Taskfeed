import express from 'express';

import authentication from '../authentication/authentication.js';
import GroupInterface from './GroupInterface.js';
import GroupError from '../errors/GroupError.js';

const memberadd = express.Router();

memberadd.use(authentication());

memberadd.post('/', (req, res) => {

	// Accepts request body tokens
	// groupid - Required
	// username - Required
	// isAdmin

	let isAdmin = false;


	if(!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}

	if(!req.body.username)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing username' });
	}
	


	if(!req.body.isAdmin)
	{
		isAdmin = true;
	}


	try {

		GroupInterface.add_member(res.locals.id, req.body.username, req.body.groupid, isAdmin);

	} catch (error) {

		if (error instanceof GroupError)
		{
			res.set({'Content-Type': 'application/json' });
			res.status(409);
			return res.send({ status : 'ERROR', message: error.message });
		}
		else
		{
			console.log(error);
			return res.status(500).send("Internal Server Error");
		}	
		

	}

	
	res.set({'Content-Type': 'application/json' });
	res.status(200);
	return res.send({ status : 'OK' });


})


export default memberadd;


