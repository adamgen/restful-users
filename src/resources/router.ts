import { Router } from 'express';
import { handleGetUsers, handlePostUsers } from './users/users.handler';

export const router = Router();

router.get('/users', handleGetUsers);
router.post('/users', handlePostUsers);
