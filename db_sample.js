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
SignupInterface.new_user("user3", "pass")
SignupInterface.new_user("user4", "pass")

let users =
[
	LoginInterface.login("user1", "pass"),
	LoginInterface.login("user2", "pass"),
	LoginInterface.login("user3", "pass"),
	LoginInterface.login("user4", "pass")
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

GroupInterface.create(users[0].id, "GroupTest1");
GroupInterface.create(users[1].id, "GroupTest2");

let group1 = GroupInterface.list_groups(users[0].id)[0];
let group2 = GroupInterface.list_groups(users[1].id)[0];

GroupInterface.add_member(users[0].id,"user2",group1.groupid, true);
GroupInterface.add_member(users[0].id,"user3",group1.groupid, false);
GroupInterface.add_member(users[0].id,"user4",group1.groupid, false);

GroupInterface.add_member(users[1].id,"user1",group2.groupid, true);
GroupInterface.add_member(users[1].id,"user3",group2.groupid, false);
GroupInterface.add_member(users[1].id,"user4",group2.groupid, false);


PostInterface.post_time(users[0].id,group1.groupid,"Maecenas venenatis nisi at vehicula dapibus.",displace(0,20),false);
PostInterface.post_time(users[0].id,group1.groupid,"Phasellus ut mattis urna. Vivamus lectus nunc, auctor facilisis turpis vel",displace(1,18),false);
PostInterface.post_time(users[0].id,group1.groupid,"Donec pretium ultricies enim, tincidunt commodo justo consectetur ac. ",displace(1,40),false);

PostInterface.post_time(users[1].id,group1.groupid,"Aliquam aliquet metus eu tortor blandit bibendum.",displace(0,22),false);
PostInterface.post_time(users[1].id,group1.groupid,"Nulla elementum sed enim sed volutpat. Cras pharetra massa odio",displace(1,36),false);
PostInterface.post_time(users[1].id,group1.groupid,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",displace(1,23),false);

PostInterface.post_time(users[0].id,group2.groupid,"Suspendisse consectetur lacinia est nec finibus. Nam augue erat,",displace(1,18),false);
PostInterface.post_time(users[2].id,group2.groupid,"Nulla tincidunt massa est, nec vulputate dolor eleifend sed.",displace(1,40),false);
PostInterface.post_time(users[3].id,group2.groupid,"Nunc congue risus arcu. Praesent non nunc felis.",displace(0,20),false);

PostInterface.post_time(users[2].id,group2.groupid,"Sed eu consectetur enim, aliquam vulputate diam.",displace(0,22),false);
PostInterface.post_time(users[1].id,group2.groupid,"Donec venenatis ultricies ligula a tempor.",displace(1,36),false);
PostInterface.post_time(users[3].id,group2.groupid,"Ut vel lacus justo. Proin neque justo, lacinia in feugiat eget",displace(1,23),false);
