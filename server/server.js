import express from 'express';
import cors from 'cors';
import api from './api.js'

import process from 'process'
import auth from './auth.js';
import AuthDatabase from './database/AuthDatabase.js';
import AppDatabase from './database/AppDatabase.js';

process.on('SIGINT', () => {
  console.log('Server received SIGINT signal (Ctrl+C). Shutting down...');

  AuthDatabase.db.close();
  AppDatabase.db.close();

  process.exit(0);
});

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()); // Middleware to parse JSON request bodys

app.use(cors()); // Fixes issues with CORS-policies

// Error handler for middleware
app.use((err, req, res, next) => {
	console.error(err.stack)

	if (err instanceof SyntaxError)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}

	next(err);
  }) 

app.use('/api', api); // Uses the router object defined by the token which handles requests at "/api"
app.use('/auth', auth); // Uses the router object defined by the token which handles requests at "/auth"
// Routers objects allow to define endpoints in modular fashion. 

app.get('/', (req, res) => {
  res.send("Hello World")
}) // Testing page

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  }) // Make the server start listen to requests from clients
  