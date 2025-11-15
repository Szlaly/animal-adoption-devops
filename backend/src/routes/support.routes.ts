import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';
import { addSupportReply, adminAddReply, closeSupportRequest, createSupportRequest, getAllSupportRequests } from '../controllers/support.controller';
import { getUserSupportRequests } from '../controllers/support.controller';




const router = express.Router();

router.post('/', authenticate, createSupportRequest);
router.get('/', authenticate, requireAdmin, getAllSupportRequests);
router.get('/my', authenticate, getUserSupportRequests);
router.post("/:id/reply", authenticate, addSupportReply);
router.post('/response', authenticate, requireAdmin, adminAddReply);
router.put('/close/:id', authenticate, requireAdmin, closeSupportRequest);
export default router;
