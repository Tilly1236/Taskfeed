import AuthDatabase from "../database/AuthDatabase.js";
import AppDatabase from "../database/AppDatabase.js";

import crypto from 'crypto';


class LoginInterface
{

	static salt = "salt"

	static login(username, password)
	{

		if (AppDatabase.username_exists(username) != 1 )
		{
			return -1;
		}

		let userid = AppDatabase.get_userid(username);

		let auth_hash = AuthDatabase.get_hash(userid);

		let hello = password+this.salt

		let hash = crypto.createHash('sha256', "").update(password+this.salt).digest('hex');

		console.log(`${auth_hash} ${hello}`)

		if (auth_hash === hash)
		{
			return 1;
		}
		else
		{
			return -1;
		}
	}
}

export default LoginInterface