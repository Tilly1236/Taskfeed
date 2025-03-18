import Database from 'better-sqlite3';

class AuthDatabase 
{
    static db;

    // initializes the authentication database on class initialization 
    static 
    {   
        if (!this.db)
        {
            this.db = new Database('./server/database/AuthDatabase.sqlite3');
            this.db.pragma('journal_mode = WAL');

            this.db.prepare("CREATE TABLE IF NOT EXISTS auth (userid TEXT PRIMARY KEY, hash TEXT) ").run();
        }
        
    }

    static add_auth(userid, hash)
    {
        this.db.prepare("INSERT INTO auth VALUES (?, ?)").run(userid, hash);
    }

}

export default AuthDatabase;