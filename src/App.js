import React, { useEffect } from 'react';
import AppRoutes from './routing/AppRoutes';
import './config/FirebaseConfig';
function App() {
  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);
  return <AppRoutes />;
}

export default App;
