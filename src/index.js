import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './modules/shared/contexts/AuthContext';
import './index.css';

/**
 * The entry point of the React application
 *
 * This file initializes the React application by rendering the App component
 * within the AuthProvider context, and attaches it to the DOM element with the ID 'root'.
 */

// Create a root element for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within the AuthProvider context
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);