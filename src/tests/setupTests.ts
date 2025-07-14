import { resetUsers } from '../controllers/userController';
import { resetTasks } from '../controllers/taskController';
import { resetCategories } from '../controllers/categoryController';
import { resetCustomers } from '../controllers/customerController';
import { resetInvoices } from '../controllers/invoiceController';
import { resetOrders } from '../controllers/orderController';
import { resetPayments } from '../controllers/paymentController';
import { resetProducts } from '../controllers/productController';
import { resetReviews } from '../controllers/reviewController';
import { resetShipments } from '../controllers/shipmentController';

beforeEach(() => {
  resetUsers();
  resetTasks();
  resetCategories();
  resetCustomers();
  resetInvoices();
  resetOrders();
  resetPayments();
  resetProducts();
  resetReviews();
  resetShipments();
});
