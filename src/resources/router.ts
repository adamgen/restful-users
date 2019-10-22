import { Router } from 'express';
import { handleGetUsers, handlePostUsers, handleGetUsersValidateToken, handleDeleteUsers } from './users/users.handler';

export const router = Router();

router.get('/users', handleGetUsersValidateToken);
router.get('/users', handleGetUsers);
router.post('/users', handlePostUsers);
router.delete('/users', handleDeleteUsers);
