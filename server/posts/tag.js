import express from 'express';

import PostInterface from './PostInterface.js';
import authentication from '../authentication/authentication.js';

const tag = express.Router();

tag.use(authentication());

tag.post('/', (req, res) => {

	// Accepts request body tokens
	// postid - Required
	// tag - Required
	// groupid - Required


	if(!req.body.postid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing postid' });
	}

	if(!req.body.tag)
	{
		req.body.tag = "";
	}

	if(!req.body.groupid)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Missing groupid' });
	}


	try {

		PostInterface.tag(req.body.tag, req.body.postid, req.body.groupid);

	} catch (error) {

		console.log(error);
		return res.status(500).send("Internal Server Error");

	}

	
	res.set({'Content-Type': 'application/json' });
	res.status(200);
	return res.send({ status : 'OK' });


})


export default tag;


