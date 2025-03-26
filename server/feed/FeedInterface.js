import AppDatabase from "../database/AppDatabase.js";

class FeedInterface
{
	static getfeed(created_at, groupid)
	{
		
		let feeds = AppDatabase.get_posts(created_at, groupid);

		return feeds;
	}
}

export default FeedInterface;