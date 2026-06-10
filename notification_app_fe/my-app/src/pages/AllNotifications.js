import React, { useState, useEffect } from 'react';
import { getNotifications } from '../services/api';
import { Card, CardContent, Typography, Container } from '@mui/material';

const AllNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications()
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        All Notifications
      </Typography>
      {notifications.map(notification => (
        <Card key={notification.id} style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">{notification.message}</Typography>
            <Typography color="textSecondary">
              {new Date(notification.timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default AllNotifications;
