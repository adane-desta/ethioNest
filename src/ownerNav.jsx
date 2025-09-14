import React, { useState, useEffect, useRef } from 'react';

import { 
  FaHome, FaBuilding, FaHeart, FaEnvelope, 
  FaBell, FaBars, FaTimes, FaReply, 
  FaHome as FaHomeIcon, FaCog, FaStar, FaCalendarCheck,
  FaHeart as FaHeartIcon, FaTimes as FaTimesIcon
} from 'react-icons/fa';
import axios from 'axios';
import '/css/fontawesome.min.css'
import './styles/navBar2.css'

const ONavbar = () => {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const API_BASE_URL = 'http://localhost:5200/api';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Message states
  const [activeMessageTab, setActiveMessageTab] = useState('all');
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [replyingMessageId, setReplyingMessageId] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [replyConfirmations, setReplyConfirmations] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  
  // Notification states
  const [activeNotificationTab, setActiveNotificationTab] = useState('all');
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  // Refs for dropdowns
  const messagesRef = useRef(null);
  const notificationsRef = useRef(null);
  const messagesLinkRef = useRef(null);
  const notificationBellRef = useRef(null);

  // API Endpoints
  const API_ENDPOINTS = {
    MESSAGES: {
      GET: `${API_BASE_URL}/receiver/${user.id}`,
      MARK_READ: (id) => `${API_BASE_URL}/${id}/mark-read`,
      MARK_ALL_READ: `${API_BASE_URL}/mark-all-read/${user.id}`,
      REPLY: `${API_BASE_URL}/reply`
    },
    NOTIFICATIONS: {
      GET: `${API_BASE_URL}/notifications/user/${user.id}`,
      MARK_READ: (id) => `${API_BASE_URL}/notifications/${id}/mark-read`,
      MARK_ALL_READ: `${API_BASE_URL}/notifications/mark-all-read/${user.id}`
    },
    USERS: {
      GET: (id) => `${API_BASE_URL}/users/${id}`
    }
  };

    // Load initial counts
    useEffect(() => {
      const fetchInitialCounts = async () => {
        try {
          const messagesResponse = await axios.get(API_ENDPOINTS.MESSAGES.GET);
          const unreadMsgs = messagesResponse.data.filter(msg => !msg.is_read);
          setUnreadMessages(unreadMsgs.map(msg => msg.id));
          
          const notificationsResponse = await axios.get(API_ENDPOINTS.NOTIFICATIONS.GET);
          const unreadNotifs = notificationsResponse.data.filter(notif => !notif.is_read);
          setUnreadNotifications(unreadNotifs.map(notif => notif.id));
        } catch (error) {
          console.error('Error fetching initial counts:', error);
        }
      };
  
      fetchInitialCounts();
    }, []);

  // Fetch messages from API
  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const response = await axios.get(API_ENDPOINTS.MESSAGES.GET);
      const messagesWithSenders = await Promise.all(
        response.data.map(async message => {
          const senderResponse = await axios.get(API_ENDPOINTS.USERS.GET(message.sender_id));
          return {
            ...message,
            sender_name: `${senderResponse.data[0].firstname} ${senderResponse.data[0].lastname}`,
            sender_avatar: `/images/${senderResponse.data[0].profile_picture}` || '/images/defaultpp.jpeg',
            is_read: message.is_read || false
          };
        })
      );
      
      setMessages(messagesWithSenders);
      
      // Extract unread message IDs
      const unread = messagesWithSenders.filter(msg => !msg.is_read).map(msg => msg.id);
      setUnreadMessages(unread);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Fetch notifications from API
  const fetchNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const response = await axios.get(API_ENDPOINTS.NOTIFICATIONS.GET);
      setNotifications(response.data);
      
      // Extract unread notification IDs
      const unread = response.data.filter(notif => !notif.is_read).map(notif => notif.id);
      setUnreadNotifications(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  // Load data when dropdowns are opened
  useEffect(() => {
    if (showMessages) {
      fetchMessages();
    }
  }, [showMessages]);

  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
    }
  }, [showNotifications]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMessages && messagesRef.current && !messagesRef.current.contains(event.target)) {
        if (messagesLinkRef.current && !messagesLinkRef.current.contains(event.target)) {
          setShowMessages(false);
        }
      }
      
      if (showNotifications && notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        if (notificationBellRef.current && !notificationBellRef.current.contains(event.target)) {
          setShowNotifications(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMessages, showNotifications]);

  // Mobile menu toggle handler
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle message dropdown
  const toggleMessagesDropdown = (e) => {
    e.preventDefault();
    setShowMessages(!showMessages);
    setShowNotifications(false);
  };

  // Toggle notification dropdown
  const toggleNotificationsDropdown = () => {
    setShowNotifications(!showNotifications);
    setShowMessages(false);
  };

  // Mark all notifications as read
  const markAllNotificationsRead = async () => {
    try {
      await axios.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
      setUnreadNotifications([]);
      setNotifications(notifications.map(notif => ({ ...notif, is_read: true })));
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  // Mark all messages as read
  const markAllMessagesRead = async () => {
    try {
      await axios.put(API_ENDPOINTS.MESSAGES.MARK_ALL_READ);
      setUnreadMessages([]);
      setMessages(messages.map(msg => ({ ...msg, is_read: true })));
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Expand/collapse message
  const toggleMessageExpand = async (id, e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    setExpandedMessageId(expandedMessageId === id ? null : id);
    
    // Mark as read when expanded if unread
    if (expandedMessageId !== id && unreadMessages.includes(id)) {
      try {
        await axios.put(API_ENDPOINTS.MESSAGES.MARK_READ(id));
        setUnreadMessages(unreadMessages.filter(msgId => msgId !== id));
        setMessages(messages.map(msg => 
          msg.id === id ? { ...msg, is_read: true } : msg
        ));
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  // Toggle reply form
  const toggleReplyForm = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (replyingMessageId === id) {
      setReplyingMessageId(null);
    } else {
      setReplyingMessageId(id);
      setReplyText('');
      
      if (expandedMessageId !== id) {
        setExpandedMessageId(id);
      }
    }
  };

  // Cancel reply
  const cancelReply = (id) => {
    setReplyingMessageId(null);
  };

  // Send reply
  const sendReply = async (id) => {
    if (!replyText.trim()) {
      alert('Please enter your reply');
      return;
    }
    
    try {
      await axios.post(API_ENDPOINTS.MESSAGES.REPLY, {
        sender_id: user.id,
        receiver_id: messages.find(msg => msg.id === id).sender_id,
        content: replyText
      });
      
      setReplyingMessageId(null);
      setReplyText('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  // Group messages by date for display
  const groupMessagesByDate = (messages) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return messages.reduce((groups, message) => {
      const messageDate = new Date(message.sent_at);
      let group;
      
      if (messageDate >= today) {
        group = 'Today';
      } else if (messageDate >= yesterday) {
        group = 'Yesterday';
      } else {
        group = 'Earlier';
      }
      
      if (!groups[group]) {
        groups[group] = [];
      }
      
      groups[group].push(message);
      return groups;
    }, {});
  };

  // Group notifications by date for display
  const groupNotificationsByDate = (notifications) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    return notifications.reduce((groups, notification) => {
      const notificationDate = new Date(notification.created_at);
      let group;
      
      if (notificationDate >= today) {
        group = 'Today';
      } else if (notificationDate >= yesterday) {
        group = 'Yesterday';
      } else {
        group = 'Earlier';
      }
      
      if (!groups[group]) {
        groups[group] = [];
      }
      
      groups[group].push(notification);
      return groups;
    }, {});
  };

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <nav>

        <div className="logo">
          <img src="/images/adare_rent_logo.png" alt="Logo" />
          <span className="logo-text">Adare<span>Rent</span></span>
        </div>

        <div className="nav-links">
        <a 
            href="#" 
            ref={messagesLinkRef}
            onClick={toggleMessagesDropdown}
            id="messagesLink"
            className="messages-link"
            style={{
                textDecoration: 'none',
                color: 'black',
                fontweight: 500,
                fontsize: '1.05rem',
                transition: 'all 0.3s ease',
                padding: '0.8rem 1rem',
                borderradius: '0.5rem',
                display: 'flex',
                alignitems: 'center',
                gap: '6px',
                marginLeft: '180%'
            }}
          > 
            <FaEnvelope /> Messages
            {unreadMessages.length > 0 && (
              <span className="notification-badge">{unreadMessages.length}</span>
            )}
          </a>
        </div>

        <div className="nav-actions">
          <button 
            className="icon-btn" 
            onClick={toggleNotificationsDropdown}
            ref={notificationBellRef}
          >
            <FaBell />
            {unreadNotifications.length > 0 && (
              <span className="notification-badge">{unreadNotifications.length}</span>
            )}
          </button>
          <a href="#" style={{cursor: 'pointer', textDecoration: 'none'}}>
            <div className="profile-preview">
              <img 
                id="profilePreview" 
                src={user.profile_picture ? `/images/${user.profile_picture}` : '/images/defaultpp.jpeg'} 
                alt="Profile Preview"
              />
            </div>
          </a>
          
        </div>
      </nav>

      {/* Message Dropdown */}
      {showMessages && (
        <div className="message-container active" ref={messagesRef}>
          <div className="message-header">
            <h3>Messages</h3>
            <button onClick={markAllMessagesRead}>Mark all as read</button>
          </div>

          <div className="message-tabs">
            <button 
              className={`tab-btn ${activeMessageTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveMessageTab('all')}
            >
              All
            </button>
            <button 
              className={`tab-btn ${activeMessageTab === 'unread' ? 'active' : ''}`}
              onClick={() => setActiveMessageTab('unread')}
            >
              Unread
            </button>
          </div>

          <div className="message-content">
            {isLoadingMessages ? (
              <div className="loading">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="no-messages">No messages found</div>
            ) : (
              Object.entries(groupMessagesByDate(messages)).map(([group, groupMessages]) => (
                <div className="message-group" key={group}>
                  <div className="group-title">{group}</div>
                  
                  {groupMessages
                    .filter(msg => 
                      activeMessageTab === 'all' || 
                      (activeMessageTab === 'unread' && !msg.is_read)
                    )
                    .map(message => (
                      <div 
                        key={message.id}
                        className={`message-item ${!message.is_read ? 'unread' : ''} ${expandedMessageId === message.id ? 'expanded' : ''}`}
                        onClick={(e) => toggleMessageExpand(message.id, e)}
                      >
                        <img 
                          src={message.sender_avatar} 
                          alt="User" 
                          className="message-avatar" 
                        />
                        <div className="message-details">
                          <div className="message-title">
                            <span className="message-sender">{message.sender_name}</span>
                            <span className="message-time">{formatTime(message.sent_at)}</span>
                          </div>
                          <div className="message-preview">
                            {message.content.length > 100 
                              ? `${message.content.substring(0, 100)}...` 
                              : message.content}
                          </div>

                          {expandedMessageId === message.id && (
                            <>
                              <div className="message-full">
                                {message.content.split('\n').map((para, idx) => (
                                  <p key={idx}>{para}</p>
                                ))}
                              </div>
                              
                              <div className="message-actions">
                                <button 
                                  className="message-action reply-btn"
                                  onClick={(e) => toggleReplyForm(message.id, e)}
                                >
                                  <FaReply /> {replyingMessageId === message.id ? 'Cancel Reply' : 'Reply'}
                                </button>
                              </div>
                            </>
                          )}
                        </div>

                        {replyingMessageId === message.id && (
                          <div className="reply-form">
                            <textarea 
                              className="reply-textarea" 
                              placeholder="Type your reply here..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            ></textarea>
                            <div className="reply-buttons">
                              <button 
                                className="cancel-reply"
                                onClick={(e) => {
                                   e.stopPropagation()
                                   cancelReply(message.id)
                                }}
                              >
                                Cancel
                              </button>
                              <button 
                                className="send-reply"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  sendReply(message.id)
                                }}
                              >
                                Send
                              </button>
                            </div>
                            {replyConfirmations[message.id] && (
                              <div className="reply-confirmation">
                                {replyConfirmations[message.id]}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>

          <div className="message-footer">
            <a href="/messages" className="view-all">View All Messages</a>
          </div>
        </div>
      )}

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="notification-container active" ref={notificationsRef}>
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              <button className="action-btn">
                <FaCog />
              </button>
              <button 
                className="action-btn" 
                onClick={markAllNotificationsRead}
              >
                Mark all as read
              </button>
            </div>
          </div>

          <div className="notification-tabs">
            <button 
              className={`tab-btn ${activeNotificationTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveNotificationTab('all')}
            >
              All
            </button>
            <button 
              className={`tab-btn ${activeNotificationTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveNotificationTab('messages')}
            >
              Messages
            </button>
            <button 
              className={`tab-btn ${activeNotificationTab === 'alerts' ? 'active' : ''}`}
              onClick={() => setActiveNotificationTab('alerts')}
            >
              Alerts
            </button>
          </div>

          <div className="notification-content">
            {isLoadingNotifications ? (
              <div className="loading">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="no-notifications">No notifications found</div>
            ) : (
              Object.entries(groupNotificationsByDate(notifications)).map(([group, groupNotifications]) => (
                <div className="notification-group" key={group}>
                  <div className="group-title">{group}</div>
                  
                  {groupNotifications
                    .filter(notif => 
                      activeNotificationTab === 'all' || 
                      (activeNotificationTab === 'messages' && notif.title.includes('Message')) ||
                      (activeNotificationTab === 'alerts' && !notif.title.includes('Message'))
                    )
                    .map(notification => (
                      <div 
                        key={notification.id}
                        className={`notification-item ${unreadNotifications.includes(notification.id) ? 'unread' : ''}`}
                        onClick={async () => {
                          if (unreadNotifications.includes(notification.id)) {
                            try {
                              await axios.put(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notification.id));
                              setUnreadNotifications(unreadNotifications.filter(id => id !== notification.id));
                              setNotifications(notifications.map(notif => 
                                notif.id === notification.id ? { ...notif, is_read: true } : notif
                              ));
                            } catch (error) {
                              console.error('Error marking notification as read:', error);
                            }
                          }
                        }}
                      >
                        <div className="notification-icon">
                          {notification.title.includes('Message') ? <FaEnvelope /> : <FaBell />}
                        </div>
                        <div className="notification-details">
                          <div className="notification-title">
                            <span>{notification.title}</span>
                            <span className="notification-time">{formatTime(notification.created_at)}</span>
                          </div>
                          <p className="notification-message">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ))
            )}
          </div>

          <div className="notification-footer">
            <a href="/notifications" className="view-all">View All Notifications</a>
          </div>
        </div>
      )}
    </>
  );
};

export default ONavbar;