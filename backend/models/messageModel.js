import db  from '../config/db.js';

class Message {
  static async create({ sender_id, receiver_id, content }) {
    const [result] = await db.query(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [sender_id, receiver_id, content]
    );
    return result.insertId;
  }

  static async findByReceiverId(receiver_id) {
    const [rows] = await db.query(
      'SELECT m.*, u.firstname, u.lastname, u.profile_picture FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.receiver_id = ? ORDER BY m.sent_at DESC',
      [receiver_id]
    );
    return rows;
  }

  static async markAsRead(message_id) {
    await db.query(
      'UPDATE messages SET is_read = 1 WHERE id = ?',
      [message_id]
    );
  }

  static async markAllAsRead(receiver_id) {
    await db.query(
      'UPDATE messages SET is_read = 1 WHERE receiver_id = ? AND is_read = 0',
      [receiver_id]
    );
  }
}

export default Message;