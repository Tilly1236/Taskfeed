
import AppDatabase from "../database/AppDatabase.js";

import process from "process"
import GroupError from "../errors/GroupError.js";

/**
 * Helper class for post endpoint
 */
class GroupInterface
{	

	static group_increment = parseFloat(process.env.GROUP_INC) || 100000000000;
    static add = parseInt(process.env.ADD) || 1234;

	// Runs on class initialization 
    static
    {
        // Retrieves the last user database to continue the increment if the server restarts 
        let last = AppDatabase.last_groupid
        if (last)
        {
            GroupInterface.increment = parseInt(last) + GroupInterface.add;
        }

        
    }

	static create(leaderid, groupname)
	{
		if (AppDatabase.groupname_exists(groupname) == 1)
		{
			throw new GroupError("Group name in use");
		}

		AppDatabase.create_group(GroupInterface.group_increment, leaderid, groupname)
	}

	static add_member(senderid, membername, groupid, isAdmin)
	{

		if (AppDatabase.group_exists(groupid) != 1)
		{
			throw new GroupError("Group does not exist");
		}

		if (AppDatabase.username_exists(membername) != 1)
		{
			throw new GroupError("Member to be added does not exist");
		}

		if (AppDatabase.is_member_in_group(senderid, groupid) != 1)
		{
			throw new GroupError("User is in not in this group")
		}

		let permissions = AppDatabase.get_permissions(senderid, groupid);

		if (permissions["isAdmin"] != 1 || permissions["isLeader"] != 1)
		{
			throw new GroupError("User does not have permission to add members to this group");
		}

		let memberid = AppDatabase.get_userid(membername);

		if (senderid == memberid)
		{
			throw new GroupError("Cannot add yourself to a group")
		}

		if (AppDatabase.is_member_in_group(memberid, groupid) == 1)
		{
			throw new GroupError("Member already is in this group")
		}

		AppDatabase.add_member(memberid, groupid, Number(isAdmin));
	}

    static leave(userid, groupid)
	{
		if (AppDatabase.group_exists(groupid) != 1)
		{
			throw new GroupError("Group does not exist");
		}

		if (AppDatabase.is_member_in_group(userid, groupid) != 1)
		{
			throw new GroupError("Cannot leave a group not member of")
		}

		let permissions = AppDatabase.get_permissions(userid, groupid);

		if (permissions["isLeader"] == 1)
		{
			throw new GroupError("Group leaders cannot leave group");
		}

		AppDatabase.remove_member(userid, groupid);
	}

 
}

export default GroupInterface;