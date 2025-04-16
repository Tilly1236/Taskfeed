import Database from 'better-sqlite3';

class AppDatabase 
{
    static db;

    // initializes the authentication database on class initialization 
    static 
    {   
        if (!this.db)
        {
            this.db = new Database('./server/database/AppDatabase.sqlite3');
            this.db.pragma('journal_mode = WAL');

            // users
            this.db.prepare("CREATE TABLE IF NOT EXISTS users (userid INTEGER PRIMARY KEY, username TEXT UNIQUE) ").run();

            // posts
            this.db.prepare("CREATE TABLE IF NOT EXISTS posts (postid INTEGER PRIMARY KEY, userid INTEGER, groupid INTEGER, created_at INTEGER, textcontent TEXT, hasImages INTEGER, FOREIGN KEY(userid) REFERENCES users(userid))").run();
        }
    }

    static add_user(userid, username)
    {
        this.db.prepare("INSERT INTO users VALUES (?, ?)").run(userid, username);
    }

    static username_exists(username)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM users WHERE username = ?) AS row_exists;").get(username)['row_exists'];
    }

    static get_userid(username)
    {
        return this.db.prepare("SELECT userid FROM users WHERE username = ?").get(username)['userid'];
    }

    static add_post(postid, userid, groupid, textcontent, hasimages)
    {
        this.db.prepare("INSERT INTO posts VALUES (?, ?, ?, unixepoch('now'), ?, ?)").run(postid, userid, groupid, textcontent, Number(hasimages));
    }

    static get_posts(groupid, latest, earliest=0)
    {
        return this.db.prepare("SELECT p.*, u.username FROM posts p inner join users u on p.userid = u.userid WHERE created_at<? AND created_at>=? AND groupid=? ORDER BY created_at DESC LIMIT 100 ").all(latest, earliest, groupid);
    }

    /**
     * Dynamically creates a sqlite query depending params not being null
     * @param {*} groupid Required
     * @param {*} latest 
     * @param {*} earliest 
     * @param {*} authorname 
     * @param {*} contains 
     * @returns 
     */
    static filtered_get_posts(groupid, latest, earliest, authorname, contains)
    {   
        let formatted_contains = "";
        let formatted_authorname = "";
        let string_cap = "SELECT p.*, u.username FROM posts p inner join users u on p.userid = u.userid WHERE groupid=@groupid"

        if(latest)
        {
            string_cap += " AND created_at<@latest";
        }
        if(earliest)
        {
            string_cap += " AND created_at>=@earliest";
        }
        if(authorname)
        {
            formatted_authorname = `%${authorname}%`
            string_cap += " AND u.username LIKE @authorname";
        }
        if(contains)
        {
            formatted_contains = `%${contains}%`
            string_cap += " AND textcontent LIKE @contains";
        }

        string_cap += " ORDER BY created_at DESC LIMIT 100";

        return this.db.prepare(string_cap).all({groupid:groupid, latest:latest, earliest:earliest, authorname:formatted_authorname, contains:formatted_contains});

    }

    static get last_postid()
    {
        return this.db.prepare("SELECT MAX(postid) FROM posts LIMIT 1;").get()['MAX(postid)']
    }

}

export default AppDatabase;