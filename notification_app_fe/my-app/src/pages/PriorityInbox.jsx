// src/pages/PriorityInbox.jsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Alert } from '@mui/material';
import { getPriorityNotifications } from '../services/api';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getReadStatus, setReadStatus } from '../utils/localStorage';

const PriorityInbox = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readStatus, setRead] = useState(getReadStatus());

  useEffect(() => {
    const fetchPriorityNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPriorityNotifications();
        setNotifications(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriorityNotifications();
  }, []);

  const markAsRead = (id) => {
    setReadStatus(id);
    setRead(getReadStatus());
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ my: 4 }}>
        Priority Inbox
      </Typography>

      {loading && <LoadingSkeleton />}
      {error && <Alert severity="error">Error fetching priority notifications: {error.message}</Alert>}
      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No priority notifications.</Alert>
      )}

      <Grid container spacing={2}>
        {notifications.map((notification) => (
          <Grid item xs={12} sm={6} md={4} key={notification.id}>
            <NotificationCard
              notification={notification}
              isRead={readStatus[notification.id]}
              onClick={() => markAsRead(notification.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PriorityInbox;
