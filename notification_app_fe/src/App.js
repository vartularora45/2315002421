import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AllNotifications from './pages/AllNotifications';
import PriorityInbox from './pages/PriorityInbox';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AllNotifications />} />
        <Route path="/priority-inbox" element={<PriorityInbox />} />
      </Routes>
    </Router>
  );
}

export default App;
