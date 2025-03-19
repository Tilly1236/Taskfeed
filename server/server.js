import express from 'express';
import api from './api.js'

const app = express()
const port = 3000

app.use('/api', api);

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  })
  