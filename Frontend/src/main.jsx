import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { BlogsProvider } from "./Context/BlogContext";
import "./index.css"
import './i18n';

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    
      <AuthProvider>
        <BlogsProvider>
        <App />
        </BlogsProvider>
      </AuthProvider>
    
  </React.StrictMode>
);
