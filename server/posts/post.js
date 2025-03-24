import express from 'express';

import PostInterface from './PostInterface.js';
import authentication from '../authentication/authentication.js';

const post = express.Router();

post.use(express.json());
post.use(authentication());

post.post('/', (req, res) => {

	let hasImages = false;

	if(!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}

	if(!req.body.textcontent)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}

	if (req.body.images)
	{
		hasImages = true	
	}

	try {

		PostInterface.post(res.locals.id, req.body.groupid, req.body.textcontent, hasImages);

	} catch (error) {

		console.log(error);
		return res.status(500).send("Internal Server Error");

	}

	
	res.set({'Content-Type': 'application/json' });
	res.status(200);
	return res.send({ status : 'OK' });


})


export default post;


