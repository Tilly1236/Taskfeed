import express from 'express';

import authentication from '../authentication/authentication.js';
import FeedInterface from './FeedInterface.js';

const filter = express.Router();

filter.use(authentication());


filter.post('/', (req, res) => {


	// Filter by
	// Timestamp (Latest, Earliest)
	// Author
	// Content
	
	if (!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}



	let listFeed

	try {
		listFeed = FeedInterface.filter(req.body.groupid, req.body.latest, req.body.earliest, req.body.author, req.body.contains);
	} catch (error) {
		console.log(error);
		return res.status(500).send("Internal Server Error");
	}

	
	return res.status(200).send(listFeed);
})


export default filter;