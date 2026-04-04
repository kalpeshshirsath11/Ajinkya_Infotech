import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import VerifyOtp from "./Pages/VerifyOtp";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetailsPage";
import Courses from "./Pages/Courses";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminStudents from "./Pages/AdminStudents";
import AdminStudentDetail from "./Pages/AdminStudentDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminCourses from "./Pages/AdminCourses";
import AdminBlogsPage from "./Pages/AdminBlogsPage";
import AddBlogPage from "./Pages/AddBlogPage";
import UpdateBlogPage from "./Pages/UpdateBlogPage";
import ChatBotModal from "./Components/ChatBotModal";
import HeroAdmin from "./Pages/HeroAdmin";
import TeacherBlogs from "./Pages/TeacherBlogs";
import RegisterUser from "./Pages/RegisterUser";




function App() {
  

  return (
    
      <BrowserRouter>
      
      <ToastContainer position="top-right" autoClose={3000} />
        <div className="min-h-screen flex flex-col">
          <Navbar
            
          />

          <main className="flex-grow pt-18">
  <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/otp" element={<VerifyOtp />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<AdminStudents />} />
      <Route path="/admin/students/:id" element={<AdminStudentDetail />} />
      <Route path="/admin/course" element={<AdminCourses />} />
      <Route path="/admin/blogs" element={<AdminBlogsPage />} />
      <Route path="/admin/blogs/add" element={<AddBlogPage />} />
      <Route path="/admin/blogs/edit/:id" element={<UpdateBlogPage />} />
      <Route path="/myblogs" element={<TeacherBlogs/>}/>
      
      <Route path="/admin/hero" element={<HeroAdmin />} />
      <Route path="/admin/register" element={<RegisterUser/>}/>
    </Routes>
  </div>
</main>

{/* CHATBOT GLOBAL */}
<ChatBotModal />

<Footer />
        </div>
        
      </BrowserRouter>
    
  );
}

export default App;
