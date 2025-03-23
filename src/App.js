import React, {useEffect} from 'react';
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
        // Remove the 'cart' item from local storage when the component mounts
        localStorage.removeItem('cart');
    }, []);

    return <AppRoutes/>;
}

export default App;
