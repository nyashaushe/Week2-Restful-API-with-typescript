import { Router } from 'express';
import {
  getShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from '../controllers/shipmentController.js';

const router = Router();

router.get('/', getShipments);
router.post('/', createShipment);
router.put('/:id', updateShipment);
router.delete('/:id', deleteShipment);

export default router;