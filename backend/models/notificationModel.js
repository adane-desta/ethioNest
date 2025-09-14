import db  from '../config/db.js';

class Notification {
  static async create({ user_id, title, message }) {
    const [result] = await db.query(
      'INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)',
      [user_id, title, message]
    );
    return result.insertId;
  }

  static async findByUserId(user_id) {
    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [user_id]
    );
    return rows;
  }

  static async markAsRead(notification_id) {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ?',
      [notification_id]
    );
  }

  static async markAllAsRead(user_id) {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0',
      [user_id]
    );
  }
}

export default Notification;