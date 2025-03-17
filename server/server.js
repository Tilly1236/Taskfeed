import express from 'express';
import api from './api.js'

const app = express()
const port = 3000

app.use('/api', api);

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  })
  