import express from 'express';

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.json({ Test: 'test' });
});

app.listen(port, () => {
  console.log(`Taskfeed Server: listening on port ${port}`)
})
