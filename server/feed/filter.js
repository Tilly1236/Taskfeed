import express from 'express';

import authentication from '../authentication/authentication.js';
import AppDatabase from '../database/AppDatabase.js';

const filter = express.Router();

filter.use(authentication());


filter.post('/', (req, res) => {

	// Accepts request body tokens
	// groupid - Required
	// latest
	// earliest
	// author
	// contains
	
	if (!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}



	let listFeed

	try {
		listFeed = AppDatabase.filtered_get_posts(req.body.groupid, req.body.latest, req.body.earliest, req.body.author, req.body.contains);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
	}

	
	return res.status(200).send(listFeed);
})


export default filter;