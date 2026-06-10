// src/pages/AllNotifications.jsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Select, MenuItem, FormControl, InputLabel, Pagination, Box, Alert } from '@mui/material';
import useNotifications from '../hooks/useNotifications';
import NotificationCard from '../components/NotificationCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const AllNotifications = () => {
  const { notifications, loading, error, fetchNotifications, markAsRead, readStatus } = useNotifications();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchNotifications({ page, limit: 6, notification_type: filter });
  }, [page, filter, fetchNotifications]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          All Notifications
        </Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter by Type">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading && <LoadingSkeleton />}
      {error && <Alert severity="error">Error fetching notifications: {error.message}</Alert>}
      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications found.</Alert>
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

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Pagination count={10} page={page} onChange={handlePageChange} color="primary" />
      </Box>
    </Container>
  );
};

export default AllNotifications;
