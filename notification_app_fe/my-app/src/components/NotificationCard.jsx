// src/components/NotificationCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

const NotificationCard = ({ notification, isRead, onClick }) => {
  const cardStyle = {
    marginBottom: '16px',
    cursor: 'pointer',
    backgroundColor: isRead ? '#f5f5f5' : '#ffffff',
    borderLeft: isRead ? 'none' : '5px solid #2196f3',
  };

  return (
    <Card style={cardStyle} onClick={onClick}>
      <CardContent>
        <Typography variant="h6" component="div">
          {notification.title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {new Date(notification.createdAt).toLocaleString()}
        </Typography>
        <Typography variant="body2" paragraph>
          {notification.message}
        </Typography>
        <Chip label={notification.type} color="primary" size="small" />
        {notification.priority === 'high' && (
            <Chip label="High Priority" color="error" size="small" style={{ marginLeft: '8px' }} />
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
