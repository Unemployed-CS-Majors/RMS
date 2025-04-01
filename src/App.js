import React from 'react';
import AppRoutes from './routing/AppRoutes';
import './config/FirebaseConfig';

/**
 * The main App component
 *
 * This component initializes the application, sets up routes.
 *
 * @component
 */
function App() {
  return <AppRoutes />;
}

export default App;
