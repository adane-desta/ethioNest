import Notification from '../models/notificationModel.js';

const notificationController = {


 getNotifications: async (req, res) => {
  try {
    const notifications = await Notification.findByUserId(req.params.userId);
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},

 markNotificationAsRead: async (req, res) => {
  try {
    await Notification.markAsRead(req.params.notificationId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
},

 markAllNotificationsAsRead: async (req, res) => {
  try {
    await Notification.markAllAsRead(req.params.userId);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

}

export default notificationController;