import express from 'express';

import authentication from '../authentication/authentication.js';
import GroupInterface from './GroupInterface.js';
import GroupError from '../errors/GroupError.js';

const memberremove = express.Router();

memberremove.use(authentication());

memberremove.post('/', (req, res) => {

	// Accepts request body tokens
	// groupid - Required
	// userid - Required

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


	try {

		GroupInterface.remove_member(res.locals.id, req.body.userid, req.body.groupid);

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


export default memberremove;


