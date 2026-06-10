import db from './db.js';

const Notification = {
  async findAllByUser(userId, { page = 1, limit = 10, status }) {
    let query = 'SELECT * FROM notifications WHERE user_id = $1';
    const params = [userId];
    let paramIndex = 2;

    if (status === 'read') {
      query += ` AND read = true`;
    } else if (status === 'unread') {
      query += ` AND read = false`;
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, (page - 1) * limit);

    const { rows } = await db.query(query, params);
    return rows;
  },

  async markAsRead(notificationId, userId) {
    const { rowCount } = await db.query(
      'UPDATE notifications SET read = true WHERE id = $1 AND user_id = $2',
      [notificationId, userId]
    );
    return rowCount;
  },

  async markAllAsRead(userId) {
    await db.query('UPDATE notifications SET read = true WHERE user_id = $1 AND read = false', [userId]);
  },

  async delete(notificationId, userId) {
    const { rowCount } = await db.query(
      'DELETE FROM notifications WHERE id = $1 AND user_id = $2',
      [notificationId, userId]
    );
    return rowCount;
  },

  async getUnreadCount(userId) {
    const { rows } = await db.query(
      'SELECT COUNT(*) FROM notifications WHERE user_id = $1 AND read = false',
      [userId]
    );
    return parseInt(rows[0].count, 10);
  },
};

export default Notification;
