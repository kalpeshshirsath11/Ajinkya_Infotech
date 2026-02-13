import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load auth from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 LOGIN (based on your backend response)
  const login = async (email, password) => {
    const res = await fetch("http://localhost:8082/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();

    /*
      data = {
        token,
        role,
        email
      }
    */

    const userData = {
      email: data.email,
      role: data.role,
      Image:data.image
    };

    setToken(data.token);
    setUser(userData);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//  Custom hook
export const useAuth = () => useContext(AuthContext);
