import express from 'express';
import api from './api.js'

const app = express()
const port = 3000

app.use('/api', api);

app.use((err, req, res) => {
  res.status(err.status ?? 500).send({ error: err.message })
})

app.listen(port, () => {
    console.log(`Taskfeed Server: listening on port ${port}`)
  })
  