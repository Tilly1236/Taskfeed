import express from 'express';

import authentication from '../authentication/authentication.js';
import GroupInterface from './GroupInterface.js';
import GroupError from '../errors/GroupError.js';

const groupcreate = express.Router();

groupcreate.use(authentication());

groupcreate.post('/', (req, res) => {

	// Accepts request body tokens
	// groupname - Required


	if(!req.body.groupname)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}


	try {

		GroupInterface.create(res.locals.id, req.body.groupname);

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


export default groupcreate;


