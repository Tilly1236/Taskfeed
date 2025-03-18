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

            this.db.exec("CREATE TABLE IF NOT EXISTS auth (userid TEXT PRIMARY KEY, hash TEXT) ").run();
        }
        
    }

}

export default AuthDatabase;