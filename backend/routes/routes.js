
import express from 'express';
import userController from '../controllers/userController.js';
import propertyController from '../controllers/propertyController.js';
import signupController from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import inquiryController from '../controllers/inquiryController.js';
import upload from '../upload.js';
import messageController from '../controllers/messageController.js';
import notificationController from '../controllers/notificationController.js';
import feedbackController from '../controllers/feedbackController.js';
import dashboardController from '../controllers/dashboardController.js';

const router = express.Router();



// Routes
router.get('/getusers', userController.getUsers);
router.get('/users/:user_id', userController.getUser)
router.post('/editProfile', userController.editProfile)
router.post('/newproperty', upload.propertyImages.array('property-images', 10), propertyController.addNewProperty);
router.post('/signup', upload.profilePicture.single('profileImage'), signupController.addNewUser);
router.post('/login', loginController.login)
router.get('/getProperties/:status', propertyController.getProperties);
router.get('/getProperty/:owner', propertyController.getPropertiesOwner);
router.post('/editProperty', propertyController.editProperty)
router.get('/getPropertyDetail', propertyController.getPropertyDetail);
router.post('/inquiries' , inquiryController.addInquiry)
router.get('/getinquiries/:owner_id', inquiryController.getInquiries)
router.put('/approveProperty/:property_id', propertyController.approveProperty)
router.delete('/deleteUser', userController.deleteUser)
router.delete('/deleteProperty', propertyController.deleteProperty)
router.get('/receiver/:receiverId', messageController.getMessages);
router.put('/:messageId/mark-read', messageController.markMessageAsRead);
router.put('/mark-all-read/:receiverId', messageController.markAllMessagesAsRead);
router.post('/reply', messageController.sendReply);
router.get('/notifications/user/:userId', notificationController.getNotifications);
router.put('/notifications/:notificationId/mark-read', notificationController.markNotificationAsRead);
router.put('/notifications/mark-all-read/:userId', notificationController.markAllNotificationsAsRead);
router.delete('/deleteinqu/:inqu_id' , inquiryController.deleteinqu)
router.post('/addFeedback', feedbackController.addFeedback)
router.post('/addtofavorite', propertyController.saveToFavorites)
router.get('/unsavefromfavorite', propertyController.unsaveFromFavorites)
router.get('/checkfavorites' , propertyController.checkfavorites)
router.get('/getsavedproperties', propertyController.getFavorites)
router.get('/recentproperties', propertyController.recentproperties)
router.get('/getfeedbacks', feedbackController.getFeedback)
router.get('/deleteFeedback', feedbackController.deleteFeedback)
router.get('/owner_dashboard', dashboardController.ownerDashboard)
router.get('/platform_analytics', dashboardController.analytics)
export default router;