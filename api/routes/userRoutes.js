import express from 'express'
import {
    registerUser,
    getUserById,
    createTeam,
    getTeamMembers,
    getTopUsers,
    addXP
} from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.get('/get', getUserById);
userRoutes.post('/addXP', addXP);
userRoutes.post('/createTeam', createTeam);
userRoutes.get('/getTopUsers', getTopUsers);
userRoutes.get('/getTeamMembers', getTeamMembers);

export default userRoutes;