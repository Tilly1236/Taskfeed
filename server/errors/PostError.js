

class PostError extends Error {
	constructor(message) {
	  super(message);
	  this.name = 'PostError';
	}
  }

export default PostError