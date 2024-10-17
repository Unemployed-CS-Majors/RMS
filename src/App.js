import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Auth from './components/Authentication/Auth.js';

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
