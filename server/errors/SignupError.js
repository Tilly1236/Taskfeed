

class SignupError extends Error {
	constructor(message) {
	  super(message);
	  this.name = 'SignupError';
	}
  }

export default SignupError