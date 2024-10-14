import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Auth from './components/Auth';

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
