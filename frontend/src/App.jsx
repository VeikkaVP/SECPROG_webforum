import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarContainer from './components/NavbarContainer.jsx';
import Home from './components/Home.jsx';
import LoginForm from './components/Login.jsx';
import RegisterForm from './components/Register.jsx';
import LogoutContainer from './components/Logout.jsx';
import PostsPage from './components/Posts.jsx';
import NewPostForm from './components/NewPost.jsx';

function App() {
  return (
    <Router>
      <div>
        <NavbarContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/logout" element={<LogoutContainer />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<NewPostForm />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Router>
  );
}

export default App;
