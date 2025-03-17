import sqlite3 from 'sqlite3'

class AuthDatabase 
{
    static db;

    // initializes the authentication database on class initialization 
    static 
    {   
        if (!this.db)
        {
            this.db = new sqlite3.Database('./server/database/AuthDatabase.sqlite3');
            this.db.run("CREATE TABLE IF NOT EXISTS auth (userid TEXT PRIMARY KEY, hash TEXT) ");
        }
        
    }

}

export default AuthDatabase;