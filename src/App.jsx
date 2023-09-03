import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCourse from './pages/course-admin/CreateCourse';
import Register from './pages/course-admin/Register';
import ShowCourses from './pages/courses/ShowCourses';
import './App.css'
import { Privateroute } from "./utils/private_route";
import Home from "./pages/home/Home";
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/themeStore";
import CoursePage from "./pages/courses/CoursePage";
import Cart from "./pages/cart/Cart";

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)\

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<Privateroute />}>
              <Route path="editProfile" element={<ShowCourses />} />
              <Route path="dashboard" element={<CreateCourse />} />
              <Route path="cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
    </ThemeProvider>
  );
}

export default App;