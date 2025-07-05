import express from 'express'
import {
    registerUser,
    getUserById,
    createTeam,
    getTeamMembers
} from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.get('/get', getUserById);
userRoutes.post('/createTeam', createTeam);
userRoutes.get('/getTeamMembers', getTeamMembers);

export default userRoutes;