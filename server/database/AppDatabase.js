import sqlite3 from 'sqlite3'

class AppDatabase 
{
    static db;

    // initializes the authentication database on class initialization 
    static 
    {   
        if (!this.db)
        {
            this.db = new sqlite3.Database('./server/database/AppDatabase.sqlite3');

            // users
            this.db.run("CREATE TABLE IF NOT EXISTS users (userid TEXT PRIMARY KEY, username TEXT UNIQUE, displayname TEXT) ");
        }
        
    }

}

export default AppDatabase;