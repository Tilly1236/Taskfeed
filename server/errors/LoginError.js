

class LoginError extends Error {
	constructor(message) {
	  super(message);
	  this.name = 'LoginError';
	}
  }

export default LoginError