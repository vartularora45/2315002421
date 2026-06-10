import axios from 'axios';

const getPriorityScore = (notification) => {
    const weights = { placement: 3, result: 2, event: 1 };
    const weight = weights[notification.notification_type] || 0;
    const recency = new Date(notification.createdAt).getTime();
    return (weight * 1e14) + recency;
};

const fetchAndProcessNotifications = async (limit = 10) => {
    try {
        const apiResponse = await axios.get('http://4.224.186.213/evaluation-service/notifications');
        const allNotifications = apiResponse.data.notifications;

        const scoredNotifications = allNotifications
            .filter(notif => !notif.isRead)
            .map(notif => ({
                ...notif,
                priorityScore: getPriorityScore(notif)
            }));

        scoredNotifications.sort((a, b) => b.priorityScore - a.priorityScore);

        return scoredNotifications.slice(0, limit);
    } catch (err) {
        console.error(`Failed to get notifications: ${err.message}`);
        throw new Error('API request failed');
    }
};

export default {
    getTopItems: fetchAndProcessNotifications
};
