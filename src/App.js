import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />} /> 
      </Routes>
    </Router>
  );
}

export default App;
