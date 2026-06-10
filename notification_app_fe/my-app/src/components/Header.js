import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Notification System
        </Typography>
        <Button color="inherit" component={Link} to="/">
          All Notifications
        </Button>
        <Button color="inherit" component={Link} to="/priority-inbox">
          Priority Inbox
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
