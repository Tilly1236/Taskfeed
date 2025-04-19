
import AppDatabase from "../database/AppDatabase.js";

import process from "process"
import PostError from "../errors/PostError.js";

/**
 * Helper class for post endpoint
 */
class PostInterface
{
	static increment = parseInt(process.env.POST_START) || 10000000;
    static comment_inc = parseInt(process.env.POST_START) || 10000000;
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

        let last_comment = AppDatabase.last_commentid;
        if (last_comment)
        {
            PostInterface.comment_inc = parseInt(last_comment) + PostInterface.add;
        }
    }

    


	static post(userid, groupid, textcontent, hasimages)
	{
		AppDatabase.add_post(String(PostInterface.increment), userid, groupid, textcontent, hasimages);
		PostInterface.increment += PostInterface.add;
	}

    static comment(userid, parentid, groupid, textcontent, hasimages)
    {
        if (AppDatabase.post_exists(parentid) != 1)
        {
            throw new PostError("Parentid does not exits");
        }
        

        AppDatabase.add_comment(String(PostInterface.comment_inc), parentid, userid, textcontent, hasimages);
        PostInterface.comment_inc += PostInterface.add;
    }
}

export default PostInterface;