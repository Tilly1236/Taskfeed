import process from 'process'

import crypto from 'crypto'

class AuthShared
{
	static salt = process.env.SALT || "salt";
	static hashkey = process.env.HASHKEY || "";
	
	static hash(arg)
	{
		return crypto.createHash('sha256', AuthShared.hashkey).update(arg+AuthShared.salt).digest('hex');
	}
}

export default AuthShared;