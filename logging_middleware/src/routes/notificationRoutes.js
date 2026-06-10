import express from 'express';
const router = express.Router();

// --- In-Memory Data (No Database Needed) ---
const FAKE_USER_ID = 'user123';

let alerts = [
    { id: 1, userId: 'user123', message: 'Sample Alert: Your package has shipped!', read: false },
    { id: 2, userId: 'user123', message: 'Sample Alert: You have a new follower.', read: true },
    { id: 3, userId: 'user456', message: 'This is for another user.', read: false },
    { id: 4, userId: 'user123', message: 'Sample Alert: Your subscription is expiring soon.', read: false },
];
// ---------------------------------------------

router.get('/', (req, res) => {
    const userAlerts = alerts.filter(a => a.userId === FAKE_USER_ID);
    res.json(userAlerts);
});

router.get('/unread-count', (req, res) => {
    const unreadCount = alerts.filter(a => a.userId === FAKE_USER_ID && !a.read).length;
    res.json({ count: unreadCount });
});

router.put('/:id/read', (req, res) => {
    const alertId = parseInt(req.params.id);
    const alert = alerts.find(a => a.id === alertId && a.userId === FAKE_USER_ID);

    if (alert) {
        alert.read = true;
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Alert not found' });
    }
});

router.delete('/:id', (req, res) => {
    const alertId = parseInt(req.params.id);
    const index = alerts.findIndex(a => a.id === alertId && a.userId === FAKE_USER_ID);

    if (index !== -1) {
        alerts.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Alert not found' });
    }
});

export default router;
