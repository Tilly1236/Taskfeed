import {Router} from 'express';
import groupcreate from './groupcreate.js';
import memberadd from './memberadd.js';
import memberleave from './memberleave.js';
import memberremove from './memberemove.js';
import memberlist from './memberlist.js';
import grouplist from './grouplist.js';
import memberpermissions from './memberpermissions.js';

const group = Router();

group.use("/create", groupcreate);

// Add Member (Admin/Leader Check)
group.use("/add_member", memberadd);

// Leave Group
group.use("/leave", memberleave);

// Remove Member (Admin/Leader Check)
group.use("/remove_member", memberremove);

// List Members
group.use("/list_members", memberlist);

// List of Groups
group.use("/list_groups", grouplist);

// Change Admin Powers (Leader Check)
group.use("/permissions_member", memberpermissions);



export default group;


