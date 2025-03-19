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
            this.db.prepare("CREATE TABLE IF NOT EXISTS users (userid TEXT PRIMARY KEY, username TEXT UNIQUE) ").run();
        }
        
    }

    static add_user(userid, username)
    {
        this.db.prepare("INSERT INTO users VALUES (?, ?)").run(userid, username);
    }

    static username_exits(username)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM users WHERE username = ?) AS row_exists;").get(username)['row_exists'];
    }

    static get_userid(username)
    {
        return this.db.prepare("SELECT userid FROM users WHERE username = ?").get(username)['userid'];
    }

}

export default AppDatabase;