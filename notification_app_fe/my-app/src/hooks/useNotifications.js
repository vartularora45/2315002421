// src/hooks/useNotifications.js
import { useState, useEffect, useCallback } from 'react';
import { getAllNotifications } from '../services/api';
import { getReadStatus, setReadStatus as setRead } from '../utils/localStorage';

const useNotifications = (isPriority = false) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readStatus, setReadStatus] = useState(getReadStatus());
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllNotifications(params);
      setNotifications(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const count = notifications.filter(n => !readStatus[n.id]).length;
    setUnreadCount(count);
  }, [notifications, readStatus]);

  const markAsRead = (id) => {
    setRead(id);
    setReadStatus(getReadStatus());
  };

  return { notifications, loading, error, fetchNotifications, markAsRead, readStatus, unreadCount };
};

export default useNotifications;
