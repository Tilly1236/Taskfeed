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

            
        }
        
    }

    static create_tables()
    {
        this.db.prepare("CREATE TABLE IF NOT EXISTS auth (userid INTEGER PRIMARY KEY, hash TEXT) ").run();
    }

    static drop_tables()
    {
        this.db.prepare("DROP TABLE auth ").run();
    }

    static add_auth(userid, hash)
    {
        this.db.prepare("INSERT INTO auth VALUES (?, ?)").run(userid, hash);
    }

    static get_hash(userid)
    {
        return this.db.prepare("SELECT hash FROM auth WHERE userid = ?").get(userid)['hash'];
    }

    static get last_userid()
    {
        return this.db.prepare("SELECT MAX(userid) FROM auth LIMIT 1;").get()['MAX(userid)']
    }

}

export default AuthDatabase;