import express from 'express';
import api from './api.js'

import process from 'process'

import auth from './authentication/auth.js';

const app = express()
const port = process.env.PORT || 3000

app.use('/api', api);

app.use(auth())

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  })
  