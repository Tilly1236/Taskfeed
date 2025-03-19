import AuthDatabase from "../database/AuthDatabase.js";
import AppDatabase from "../database/AppDatabase.js";

import AuthShared from './AuthShared.js';

class LoginInterface
{

	static login(username, password)
	{

		if (AppDatabase.username_exists(username) != 1 )
		{
			return -1;
		}

		let userid = AppDatabase.get_userid(username);

		let auth_hash = AuthDatabase.get_hash(userid);

		let hash = AuthShared.hash(password)

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