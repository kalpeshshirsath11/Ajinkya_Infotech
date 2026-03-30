import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios"; // your axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // =========================================================
  // LOAD FROM LOCAL STORAGE (ON REFRESH)
  // =========================================================
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      // set default header
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/login", {
        email,
        password,
      });

      const data = res.data;

      /*
        Expected backend response:
        {
          token,
          role,
          email
        }
      */

      const userData = {
        email: data.email,
        role: data.role,
      };

      // set state
      setToken(data.token);
      setUser(userData);

      // store in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // set header for future requests
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;
    } catch (error) {
      throw new Error(
        error.response?.data || "Invalid email or password"
      );
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common["Authorization"];
  };

  // =========================================================
  // PROVIDER
  // =========================================================
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

// =========================================================
// CUSTOM HOOK
// =========================================================
export const useAuth = () => useContext(AuthContext);