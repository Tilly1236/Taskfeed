import express from 'express';

import PostInterface from './PostInterface.js';
import authentication from '../authentication/authentication.js';
import PostError from '../errors/PostError.js';

const postcommment = express.Router();

postcommment.use(authentication());

postcommment.post('/', (req, res) => {

	// Accepts request body tokens
	// parentid - Required
	// groupid - Required
	// textcontent - Required
	// images

	let hasImages = false;

	if(!req.body.parentid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing parentid' });
	}

	if(!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}

	if(!req.body.textcontent)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing textcontent' });
	}

	
	if (req.body.images)
	{
		hasImages = true	
	}

	try {

		PostInterface.comment(res.locals.id, req.body.parentid, req.body.groupid, req.body.textcontent, hasImages);

	} catch (error) {

		if (error instanceof PostError)
		{
			res.set({'Content-Type': 'application/json' });
			res.status(401);
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


export default postcommment;


