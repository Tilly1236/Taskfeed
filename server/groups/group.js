import {Router} from 'express';
import groupcreate from './groupcreate.js';

const group = Router();

group.use("/create", groupcreate)

// Add Member (Admin/Leader Check)

// Leave Group

// Remove Member (Admin/Leader Check)

// List Members

// Change Admin Powers (Leader Check)

// List of Groups


export default group;


