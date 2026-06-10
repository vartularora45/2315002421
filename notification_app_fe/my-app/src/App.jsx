import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Container>
        <AppRoutes />
      </Container>
    </Router>
  );
}

export default App;
