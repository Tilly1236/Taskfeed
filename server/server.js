import express from 'express';
import api from './api.js'

import process from 'process'
import auth from './auth.js';

const app = express()
const port = process.env.PORT || 3000

app.use(express.json());

// Catching json syntax error from the json middleware
app.use((err, req, res, next) => {
	console.error(err.stack)

	if (err instanceof SyntaxError)
	{
		res.status(409);
		return res.send({ status : 'ERROR', message: 'Request is not complete' });
	}

	next(err);
  })

app.use('/api', api);
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  })
  