
import AppDatabase from "../database/AppDatabase.js";

import process from "process"

/**
 * Helper class for post endpoint
 */
class PostInterface
{
	static increment = parseInt(process.env.POST_START) || 10000000;
    static add = parseInt(process.env.POSTADD) || 1234;

    // Run on class initlization
    static
    {
        // Retrieves the last user database to continue the increment if the server restarts 
        let last = AppDatabase.last_postid;
        if (last)
        {
            PostInterface.increment = parseInt(last) + PostInterface.add;
        }

        
    }


	static post(userid, groupid, textcontent, hasimages)
	{
		AppDatabase.add_post(String(PostInterface.increment), userid, groupid, textcontent, hasimages);
		PostInterface.increment += PostInterface.add;
	}
}

export default PostInterface;