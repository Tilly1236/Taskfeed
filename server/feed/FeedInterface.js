import AppDatabase from "../database/AppDatabase.js";

class FeedInterface
{
	static getfeed(groupid, latest, earliest=0)
	{
		
		let feeds = AppDatabase.get_posts(groupid, latest, earliest);

		return feeds;
	}
}

export default FeedInterface;