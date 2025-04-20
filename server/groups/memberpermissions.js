import express from 'express';

import authentication from '../authentication/authentication.js';
import GroupInterface from './GroupInterface.js';
import GroupError from '../errors/GroupError.js';

const memberpermissions = express.Router();

memberpermissions.use(authentication());

memberpermissions.post('/', (req, res) => {

	// Accepts request body tokens
	// groupid - Required
	// userid - Required
	// isAdmin - (1 or 0)

	let isAdmin = 0;

	if(!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}

	if(!req.body.userid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing userid' });
	}

	if(req.body.isAdmin)
	{
		isAdmin = 1;
	}



	try {

		GroupInterface.permissions_member(res.locals.id, req.body.userid, req.body.groupid, isAdmin);

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


export default memberpermissions;


