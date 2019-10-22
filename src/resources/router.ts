import { Router } from 'express';
import { handleGetUsers, handlePostUsers, handleGetUsersValidateToken, handleDeleteUsers, handlePutUsers } from './users/users.handler';

export const router = Router();

router.get('/users', handleGetUsersValidateToken);
router.get('/users', handleGetUsers);
router.post('/users', handlePostUsers);
router.put('/users', handlePutUsers);
router.delete('/users', handleDeleteUsers);