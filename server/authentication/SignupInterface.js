import AuthDatabase from "../database/AuthDatabase.js";
import AppDatabase from "../database/AppDatabase.js";

import crypto from 'crypto';

class SignupInterface
{   

    static increment = 129471047261;

    static salt = "salt" // Needs to be moved in enviroment file!!!!!!!!

    static
    {
        // Retrieves the last user database to continue the increment if the server restarts 
        let last = AuthDatabase.last_userid;
        if (last)
        {
            this.increment = parseInt(last) + 2231;
        }
    }

    static new_user(username, password)
    {      
        if (AppDatabase.username_exists(username) == 1 )
        {
            return -1;
        }

        let userid = String(this.increment);

        this.increment += 2231
        let hash = crypto.createHash('sha256', "").update(password+this.salt).digest('hex');


        AuthDatabase.add_auth(userid, hash)
        AppDatabase.add_user(userid, username)
        return 1;
    }
}

export default SignupInterface;