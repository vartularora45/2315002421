import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import logRequests from './middleware/requestlogger.js';
import usersApi from './routes/userRoutes.js';
import alertsApi from './routes/notificationRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import pool from './db/db.js';
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });

app.use(cors());
app.use(express.json());
app.use(logRequests);

app.use(express.urlencoded({ extended: true }));


app.use('/users', usersApi);
app.use('/alerts', alertsApi);
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is up and running' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

httpServer.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});