
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

    

 
}

export default GroupInterface;