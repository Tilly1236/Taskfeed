import {Router} from 'express';
import groupcreate from './groupcreate.js';
import memberadd from './memberadd.js';

const group = Router();

group.use("/create", groupcreate);

// Add Member (Admin/Leader Check)
group.use("/add_member", memberadd);

// Leave Group

// Remove Member (Admin/Leader Check)

// List Members

// Change Admin Powers (Leader Check)

// List of Groups


export default group;


