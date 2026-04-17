import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem("shopkart_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = !!user;

  function login(userData) {
    sessionStorage.setItem("shopkart_user", JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    sessionStorage.removeItem("shopkart_user");
    setUser(null);
  }

  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function incrementCart(id) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decrementCart(id) {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.quantity === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }

  return (
    <AppContext.Provider
      value={{
        // auth
        user,
        isLoggedIn,
        login,
        logout,
        // cart
        cart,
        setCart,
        cartCount,
        cartTotal,
        addToCart,
        incrementCart,
        decrementCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}