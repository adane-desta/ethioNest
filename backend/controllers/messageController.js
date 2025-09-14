import Message from  '../models/messageModel.js';
import Notification  from '../models/notificationModel.js';
import userModel from '../models/userModel.js'

const messageController = {



 getMessages: async (req, res) => {
  try {
    const messages = await Message.findByReceiverId(req.params.receiverId);
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},

 markMessageAsRead: async (req, res) => {
  try {
    await Message.markAsRead(req.params.messageId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},

 markAllMessagesAsRead: async (req, res) => {
  try {
    await Message.markAllAsRead(req.params.receiverId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},

 sendReply: async (req, res) => {
  try {
    const { original_message_id, sender_id, receiver_id, content } = req.body;
    // Create the reply message
    const messageId = await Message.create({
      sender_id,
      receiver_id,
      content
    });

    // Create a notification for the receiver
    const sender = await userModel.getUser(sender_id); 
    await Notification.create({
      user_id: receiver_id,
      title: 'New Message',
      message: `${sender[0].firstname} replied to your message`
    });

    res.json({ success: true, messageId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

}

export default messageController;