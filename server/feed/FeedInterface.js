import AppDatabase from "../database/AppDatabase.js";

class FeedInterface
{
	static getfeed(groupid, latest, earliest=0)
	{
		
		let feeds = AppDatabase.get_posts(groupid, latest, earliest);

		return feeds;
	}

	static filter(groupid, latest, earliest=0, authorname, contains, media)
	{
		// Filter by
		// Timestamp (Latest, Earliest)
		// Author
		// Content
		// Media
	
		let feeds = AppDatabase.filtered_get_posts(groupid, latest, earliest, authorname, contains, media);

		return feeds;
	}
}

export default FeedInterface;