// src/components/LoadingSkeleton.jsx
import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(6)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="rectangular" width="100%" height={60} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
