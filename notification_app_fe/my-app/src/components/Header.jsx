// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import useNotifications from '../hooks/useNotifications';

const Header = () => {
    const { unreadCount } = useNotifications();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AffordMed Notifications
        </Typography>
        <Button color="inherit" component={Link} to="/">
          All Notifications
        </Button>
        <Button color="inherit" component={Link} to="/priority">
          <Badge badgeContent={unreadCount} color="error">
            Priority Inbox
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
