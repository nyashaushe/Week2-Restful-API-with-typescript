import express, { Request, Response } from 'express';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import customerRoutes from './routes/customerRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import paymentRoutes from './routes/paymentRoutes';
import shipmentRoutes from './routes/shipmentRoutes';
import reviewRoutes from './routes/reviewRoutes';
import categoryRoutes from './routes/categoryRoutes';
import swaggerUi from 'swagger-ui-express';
const swaggerSpec = require('../swagger.js');
import { loggingMiddleware } from './middleware/logging';

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
