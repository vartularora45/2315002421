import React, { useState, useEffect } from 'react';
import { getPriorityInbox } from '../services/api';
import { Card, CardContent, Typography, Container } from '@mui/al';

const PriorityInbox = () => {
  const [priorityNotifications, setPriorityNotifications] = useState([]);

  useEffect(() => {
    getPriorityInbox()
      .then(response => {
        setPriorityNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching priority inbox:', error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h4" style={{ margin: '20px 0' }}>
        Priority Inbox
      </Typography>
      {priorityNotifications.map(notification => (
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

export default PriorityInbox;
