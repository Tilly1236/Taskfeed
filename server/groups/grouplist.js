import express from 'express';

import authentication from '../authentication/authentication.js';
import GroupInterface from './GroupInterface.js';
import GroupError from '../errors/GroupError.js';

const grouplist = express.Router();

grouplist.use(authentication());

grouplist.post('/', (req, res) => {

	// No JSON Body needed

	let response;

	try {

		response = GroupInterface.list_groups(res.locals.id);

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
	return res.send(response);


})


export default grouplist;


