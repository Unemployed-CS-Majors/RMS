import React, { useEffect } from 'react';
import AppRoutes from './routing/AppRoutes';
import './config/FirebaseConfig';

/** 
 * The main App component
 *
 * This component initializes the application, sets up routes, and performs
 * initial setup tasks such as clearing the local storage cart item.
 *
 * @component
 */
function App() {
  useEffect(() => {
    // Remove the 'cart' item from local storage when the component mounts on the first visit
    if (!sessionStorage.getItem('firstVisit')) {
      localStorage.removeItem('cart');
      sessionStorage.setItem('firstVisit', 'true');
    }
  }, []);

  return <AppRoutes />;
}

export default App;
