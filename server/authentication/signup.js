import express from 'express';
import SignupInterface from './SignupInterface.js'

const signup = express.Router();

signup.use(express.json())

signup.post('/', (req, res) => {

  let query

  try
  {
    query = SignupInterface.new_user(req.body.username, req.body.password)
  }
  catch (error)
  {
    console.log(error)
    res.status(500).send("Internal Server Error")
  }

  switch (query) {
    case 1:
      res.set({'Content-Type': 'application/json' });
      res.status(201)
      res.send({ status : 'Created', message: '' })
      break;
    case -1:
      res.set({'Content-Type': 'application/json' })
      res.status(409)
      res.send({ status : 'ERROR', message: 'Username already is in use.' })
      break;
}
  
})

export default signup
