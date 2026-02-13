import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyOtp from "./Pages/VerifyOtp";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetailsPage";
import Courses from "./Pages/Courses";


function App() {
  

  return (
    
      <BrowserRouter>
      
        <div className="min-h-screen flex flex-col">
          <Navbar
            
          />

          <main className="flex-grow pt-18">
            {/* HOME wrapper only */}
            <div>
              <Routes>
                <Route
                  path="/"
                  element={<Home/>}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/otp" element={<VerifyOtp />} />
                <Route path = "/blogs" element={<Blogs/>}/>
                <Route path="/blogs/:slug" element={<BlogDetails />} />
                <Route path="/courses" element={<Courses/>}/>

              </Routes>
            </div>
          </main>

          <Footer />
        </div>
        
      </BrowserRouter>
    
  );
}

export default App;
