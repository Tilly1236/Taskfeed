import express from 'express';
import api from './api.js'

import process from 'process'

const app = express()
const port = process.env.PORT || 3000

app.use('/api', api);

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  })
  