import LoginInterface from "./server/authentication/LoginInterface.js";
import SignupInterface from "./server/authentication/SignupInterface.js";
import AppDatabase from "./server/database/AppDatabase.js";
import AuthDatabase from "./server/database/AuthDatabase.js";
import GroupInterface from "./server/groups/groupInterface.js";
import PostInterface from "./server/posts/PostInterface.js";

let currentTime = Date.now()/1000;

let hour = 3600;

let minute = 60;

function displace(h,m)
{
	return currentTime - ((hour * h) + (minute * m));
}

AppDatabase.drop_tables();
AppDatabase.create_tables();

AuthDatabase.drop_tables();
AuthDatabase.create_tables();

SignupInterface.increment = 100000000000;
PostInterface.increment = 10000000;
PostInterface.comment_inc = 10000000;
GroupInterface.increment = 100000000000;


SignupInterface.new_user("user1", "pass")
SignupInterface.new_user("user2", "pass")

let users =
[
	LoginInterface.login("user1", "pass"),
	LoginInterface.login("user2", "pass")
]

PostInterface.post_time(users[0].id,1,"Maecenas venenatis nisi at vehicula dapibus.",displace(0,20),false);
PostInterface.post_time(users[0].id,1,"Phasellus ut mattis urna. Vivamus lectus nunc, auctor facilisis turpis vel",displace(1,18),false);
PostInterface.post_time(users[0].id,1,"Donec pretium ultricies enim, tincidunt commodo justo consectetur ac. ",displace(1,40),false);

PostInterface.post_time(users[1].id,1,"Aliquam aliquet metus eu tortor blandit bibendum.",displace(0,22),false);
PostInterface.post_time(users[1].id,1,"Nulla elementum sed enim sed volutpat. Cras pharetra massa odio",displace(1,36),false);
PostInterface.post_time(users[1].id,1,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",displace(1,23),false);

let feed = AppDatabase.get_posts(1,currentTime,0);

(feed[0].postid)

PostInterface.comment(users[0].id, feed[0].postid,1,"Hello World",false);

