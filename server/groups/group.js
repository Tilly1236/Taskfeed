import {Router} from 'express';
import groupcreate from './groupcreate.js';
import memberadd from './memberadd.js';
import memberleave from './memberleave.js';
import memberremove from './memberemove.js';

const group = Router();

group.use("/create", groupcreate);

// Add Member (Admin/Leader Check)
group.use("/add_member", memberadd);

// Leave Group
group.use("/leave", memberleave);

// Remove Member (Admin/Leader Check)
group.use("/remove_member", memberremove);

// List Members

// Change Admin Powers (Leader Check)

// List of Groups


export default group;


