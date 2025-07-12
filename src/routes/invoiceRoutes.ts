import { Router } from 'express';
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoiceController';

const router = Router();

router.get('/', getInvoices);
router.post('/', createInvoice);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);

export default router;