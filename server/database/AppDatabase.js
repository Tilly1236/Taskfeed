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
            this.db.prepare("CREATE TABLE IF NOT EXISTS posts (postid INTEGER PRIMARY KEY, userid INTEGER, groupid INTEGER, created_at INTEGER, textcontent TEXT, hasImages INTEGER)").run();
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

    static get last_postid()
    {
        return this.db.prepare("SELECT MAX(postid) FROM posts LIMIT 1;").get()['MAX(postid)']
    }

}

export default AppDatabase;