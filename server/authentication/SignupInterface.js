import AuthDatabase from "../database/AuthDatabase.js";
import AppDatabase from "../database/AppDatabase.js";
import AuthShared from './AuthShared.js';

import SignupError from "../errors/SignupError.js";

import process from 'process';

/**
 * Helper class for signup endpoint
 */
class SignupInterface
{   

    static increment = parseFloat(process.env.START_INC) || 100000000000;
    static add = parseInt(process.env.ADD) || 1234;

    // Runs on class initialization 
    static
    {
        // Retrieves the last user database to continue the increment if the server restarts 
        let last = AuthDatabase.last_userid;
        if (last)
        {
            SignupInterface.increment = parseInt(last) + SignupInterface.add;
        }

        
    }

    /**
     * Creates a new user and authication scheme 
     * @param {*} username 
     * @param {*} password 
     * @throws {SignupError} If username is already being used.
     */
    static new_user(username, password)
    {      
        if (AppDatabase.username_exists(username) == 1 )
        {
           throw new SignupError("Username is in use.");
        }

        let userid = String(SignupInterface.increment);

        SignupInterface.increment += SignupInterface.add;
        let hash = AuthShared.hash(password);


        AuthDatabase.add_auth(userid, hash);
        AppDatabase.add_user(userid, username);
        return userid;
    }
}

export default SignupInterface;