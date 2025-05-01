
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
            GroupInterface.group_increment = parseInt(last) + GroupInterface.add;
        }

        
    }

	static create(leaderid, groupname)
	{
		if (AppDatabase.groupname_exists(groupname) == 1)
		{
			throw new GroupError("Group name in use");
		}

		AppDatabase.create_group(GroupInterface.group_increment, leaderid, groupname)
		GroupInterface.group_increment += GroupInterface.add;
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

		if (!(permissions["isAdmin"] == 1 || permissions["isLeader"] == 1))
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

	static remove_member(senderid, memberid, groupid)
	{
		if (AppDatabase.group_exists(groupid) != 1)
		{
			throw new GroupError("Group does not exist");
		}

		if (AppDatabase.user_exists(memberid) != 1)
		{
			throw new GroupError("Member to be added does not exist");
		}

		if (AppDatabase.is_member_in_group(senderid, groupid) != 1)
		{
			throw new GroupError("User is not in this group")
		}

		if (AppDatabase.is_member_in_group(memberid, groupid) != 1)
		{
			throw new GroupError("Member is not in this group")
		}

		let sender_permissions = AppDatabase.get_permissions(senderid, groupid);

		let member_permissions = AppDatabase.get_permissions(memberid, groupid);

		if (!(sender_permissions["isAdmin"] == 1 || sender_permissions["isLeader"] == 1))
		{
			throw new GroupError("User does not have permission to remove members to this group");
		}

		if (senderid == memberid)
		{
			throw new GroupError("Cannot remove yourself to a group");
		}

		

		if (sender_permissions["isAdmin"] == member_permissions["isAdmin"] && sender_permissions["isLeader"] != 1)
		{
			throw new GroupError("User cannot remove this member");
		}

		AppDatabase.remove_member(memberid, groupid);
	}

	static list_member(senderid, groupid)
	{

		if (AppDatabase.group_exists(groupid) != 1)
		{
			throw new GroupError("Group does not exist")
		}

		if (AppDatabase.is_member_in_group(senderid, groupid) != 1)
		{
			throw new GroupError("User is not in this group")
		}

		return AppDatabase.list_members(groupid)
	}

	static list_groups(userid)
	{
		return AppDatabase.list_groups(userid)
	}

	static permissions_member(senderid, memberid, groupid, isAdmin)
	{
		if (AppDatabase.group_exists(groupid) != 1)
		{
			throw new GroupError("Group does not exist");
		}

		if (AppDatabase.user_exists(memberid) != 1)
		{
			throw new GroupError("Member does not exist");
		}

		if (AppDatabase.is_member_in_group(senderid, groupid) != 1)
		{
			throw new GroupError("User is not in this group")
		}

		if (AppDatabase.is_member_in_group(memberid, groupid) != 1)
		{
			throw new GroupError("Member is not in this group")
		}

		let sender_permissions = AppDatabase.get_permissions(senderid, groupid);

		if (sender_permissions["isLeader"] != 1)
		{
			throw new GroupError("User does not have permission to change members permissions");
		}

		if (senderid == memberid)
		{
			throw new GroupError("Cannot your own permissions");
		}

		AppDatabase.set_member_admin(isAdmin, memberid, groupid);
	}
 
}

export default GroupInterface;