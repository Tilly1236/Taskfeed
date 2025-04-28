import express from 'express';

import authentication from '../authentication/authentication.js';
import AppDatabase from '../database/AppDatabase.js';

const commentfeed = express.Router();

commentfeed.use(authentication());


commentfeed.get('/:id', (req, res) => {
	
	// Accepts request body tokens
	// parentid - Required
	
	// if (!req.body.groupid)
	// {
	// 	res.status(409);
	// 	return res.send({ status : 'ERROR', message: 'Missing groupid' });
	// }
	if (!req.body.parentid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing parentid' });
	}

	let listFeed

	if (AppDatabase.post_exists(req.body.parentid) != 1)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Parent post does not exist' });
	}

	try {
		listFeed = AppDatabase.get_comments(req.body.parentid);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
	}
	
	return res.status(200).send(listFeed);
})


export default commentfeed;