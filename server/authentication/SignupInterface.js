import AuthDatabase from "../database/AuthDatabase.js";
import AppDatabase from "../database/AppDatabase.js";
import AuthShared from './AuthShared.js';

import process from 'process'

class SignupInterface
{   

    static increment = process.env.START_INC || 100000000000;
    static inc = process.env.INC || 1234;

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

        this.increment += this.inc;
        let hash = AuthShared.hash(password)


        AuthDatabase.add_auth(userid, hash)
        AppDatabase.add_user(userid, username)
        return 1;
    }
}

export default SignupInterface;