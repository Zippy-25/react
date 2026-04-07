import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? 
        <ProductsPage setIsLoggedIn={setIsLoggedIn} />
      :
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      }
    </>
  );
}