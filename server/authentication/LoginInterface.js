import AuthDatabase from "../database/AuthDatabase.js";
import AppDatabase from "../database/AppDatabase.js";
import AuthShared from './AuthShared.js';

import LoginError from "../errors/LoginError.js";

class LoginInterface
{

	static login(username, password)
	{

		if (AppDatabase.username_exists(username) != 1 )
		{
			throw new LoginError("Username does not exit");
		}

		let userid = AppDatabase.get_userid(username);

		let auth_hash = AuthDatabase.get_hash(userid);

		let hash = AuthShared.hash(password)

		if (auth_hash === hash)
		{
			return {"id": userid, "username": username};
		}
		else
		{
			throw new LoginError("Hashes do not match");
		}
	}
}

export default LoginInterface