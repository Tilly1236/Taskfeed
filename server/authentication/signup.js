import {express, Router} from 'express';

const signup = Router();

signup.use(express.json())

signup.post('/signup', (req, res) => {
  res.end();
})


export default signup
