

class GroupError extends Error {
	constructor(message) {
	  super(message);
	  this.name = 'GroupError';
	}
  }

export default GroupError;