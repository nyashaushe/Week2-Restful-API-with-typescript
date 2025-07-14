import express, { Request, Response } from 'express';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import { loggingMiddleware } from './middleware/logging.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(loggingMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/payments', paymentRoutes);
app.use('/shipments', shipmentRoutes);
app.use('/reviews', reviewRoutes);
app.use('/categories', categoryRoutes);
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



export default app;
