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

            this.create_tables();

        }
    }

    static create_tables()
    {
        // users
        this.db.prepare("CREATE TABLE IF NOT EXISTS users (userid INTEGER PRIMARY KEY, username TEXT UNIQUE) ").run();

        // posts
        this.db.prepare("CREATE TABLE IF NOT EXISTS posts (postid INTEGER PRIMARY KEY, userid INTEGER, groupid INTEGER, created_at INTEGER, textcontent TEXT, commentcount INTEGER, tag TEXT, hasImages INTEGER, FOREIGN KEY(userid) REFERENCES users(userid))").run();

        this.db.prepare("CREATE TABLE IF NOT EXISTS comments (commentid INTEGER PRIMARY KEY, parentid INTEGER, userid INTEGER, created_at INTEGER, textcontent TEXT, hasImages INTEGER, FOREIGN KEY(userid) REFERENCES users(userid), FOREIGN KEY(parentid) REFERENCES posts(postid))").run();

        // group system

        this.db.prepare("CREATE TABLE IF NOT EXISTS groups (groupid INTEGER PRIMARY KEY, groupname TEXT)").run();

        this.db.prepare("CREATE TABLE IF NOT EXISTS groupmembers (memberid INTEGER, groupid INTEGER, isAdmin INTEGER, isLeader INTEGER, FOREIGN KEY(memberid) REFERENCES users(userid), FOREIGN KEY(groupid) REFERENCES groups(groupid))").run();
    }

    static drop_tables()
    {
        this.db.prepare("DROP TABLE comments").run();
        this.db.prepare("DROP TABLE groupmembers").run();
        this.db.prepare("DROP TABLE groups").run();
        this.db.prepare("DROP TABLE posts").run();
        this.db.prepare("DROP TABLE users ").run();
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

    static user_exists(userid)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM users WHERE userid = ?) AS row_exists;").get(userid)['row_exists'];
    }

    static add_post(postid, userid, groupid, textcontent, hasimages)
    {
        this.db.prepare("INSERT INTO posts VALUES (?, ?, ?, unixepoch('now'), ?, 0, '', ?)").run(postid, userid, groupid, textcontent, Number(hasimages));
    }

    static add_post_time(postid, userid, groupid, textcontent,time, hasimages)
    {
        this.db.prepare("INSERT INTO posts VALUES (?, ?, ?, ?, ?, 0, '', ?)").run(postid, userid, groupid, time, textcontent,  Number(hasimages));
    }

    static change_tag(new_tag,postid)
    {
        this.db.prepare("UPDATE posts SET tag = ? WHERE postid = ?").run(new_tag,postid);
    }

    static get_posts(groupid, latest, earliest=0)
    {
        return this.db.prepare("SELECT p.*, u.username FROM posts p inner join users u on p.userid = u.userid WHERE created_at<? AND created_at>=? AND groupid=? ORDER BY created_at DESC LIMIT 100 ").all(latest, earliest, groupid);
    }

    static post_exists(postid)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM posts WHERE postid = ?) AS row_exists;").get(postid)['row_exists'];
    }

    static add_comment(commentid, parentid, userid, textcontent, hasImages)
    {
        this.db.prepare("INSERT INTO comments VALUES (?, ?, ?, unixepoch('now'), ?, ?)").run(commentid, parentid, userid, textcontent, Number(hasImages));
        this.db.prepare("UPDATE posts SET commentcount = commentcount + 1 WHERE postid = ?").run(parentid);
    }

    static get_comments(parentid)
    {   
        return this.db.prepare("SELECT c.*, u.username FROM comments c inner join users u on c.userid = u.userid WHERE parentid=? ORDER BY created_at DESC LIMIT 100 ").all(parentid);
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

    static get last_commentid()
    {
        return this.db.prepare("SELECT MAX(commentid) FROM comments LIMIT 1;").get()['MAX(commentid)']
    }

    // this.db.prepare("CREATE TABLE IF NOT EXISTS groups (groupid INTEGER PRIMARY KEY, leaderid INTEGER, groupname TEXT, FOREIGN KEY(leaderid) REFERENCES users(userid))").run();

    // this.db.prepare("CREATE TABLE IF NOT EXITS groupmembers (memberid INTEGER, groupid INTEGER, isAdmin INTEGER, FOREIGN KEY(userid) REFERENCES users(userid), FOREIGN KEY(groupid) REFERENCES groups(groupid))").run();

    static create_group(groupid, leaderid, groupname)
    {
        this.db.prepare("INSERT INTO groups VALUES (?, ?)").run(groupid, groupname);
        this.db.prepare("INSERT INTO groupmembers VALUES (?, ?, 1, 1)").run(leaderid, groupid);
    }

    static add_member(memberid, groupid, isAdmin)
    {
        this.db.prepare("INSERT INTO groupmembers VALUES (?, ?, ?, 0)").run(memberid, groupid, isAdmin);
    }

    static set_member_admin(isAdmin, memberid, groupid)
    {
        this.db.prepare("UPDATE groupmembers SET isAdmin = ? WHERE memberid = ? AND groupid = ?").run(isAdmin, memberid, groupid);
    }

    static remove_member(memberid, groupid)
    {
        this.db.prepare("DELETE FROM groupmembers WHERE memberid = ? AND groupid = ?").run(memberid, groupid);
    }

    static list_groups(memberid)
    {   
        return this.db.prepare("SELECT g.*, m.isLeader, m.isAdmin FROM groupmembers m inner join groups g on m.groupid = g.groupid WHERE memberid=? ORDER BY g.groupname DESC").all(memberid)
    }

    static list_members(groupid)
    {
        return this.db.prepare("SELECT m.*, u.username FROM groupmembers m inner join users u on u.userid = m.memberid WHERE groupid=? ORDER BY isLeader DESC, isAdmin DESC, u.username ASC;").all(groupid)
    }

    static group_exists(groupid)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM groups WHERE groupid = ?) AS row_exists;").get(groupid)['row_exists'];
    }

    static groupname_exists(groupname)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM groups WHERE groupname = ?) AS row_exists;").get(groupname)['row_exists'];
    }

    static is_member_in_group(memberid, groupid)
    {
        return this.db.prepare("SELECT exists(SELECT 1 FROM groupmembers WHERE memberid = ? AND groupid = ?) AS row_exists;").get(memberid, groupid)['row_exists'];
    }

    static get_permissions(memberid, groupid)
    {
        return this.db.prepare("SELECT isAdmin, isLeader FROM groupmembers WHERE memberid= ? AND groupid = ?").get(memberid,groupid);
    }

    static get last_groupid()
    {
        return this.db.prepare("SELECT MAX(groupid) FROM groups LIMIT 1;").get()['MAX(groupid)']
    }


}


export default AppDatabase;