import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import logRequests from './middleware/requestlogger.js';
import usersApi from './routes/userRoutes.js';
import alertsApi from './routes/notificationRoutes.js';
import PriorityService from './priorityService.js';
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

app.get('/priority-inbox', async (req, res) => {
    try {
        const topN = req.query.n ? parseInt(req.query.n) : 10;
        const notifications = await PriorityService.getTopNotifications(topN);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is up and running' });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

httpServer.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});