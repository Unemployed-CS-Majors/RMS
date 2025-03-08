import React, { useEffect } from "react";
import AppRoutes from "./AppRoutes";

function App() {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return <AppRoutes />;
}

export default App;
