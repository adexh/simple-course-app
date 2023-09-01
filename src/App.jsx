import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import CreateCourse from './pages/course-admin/CreateCourse';
import Register from './pages/course-admin/Register';
import ShowCourses from './pages/courses/ShowCourses';
import './App.css'
import { Privateroute } from "./utils/private_route";
import { SessionContextProvider } from "./contexts/auth_context";
import Home from "./pages/home/home";
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
      <SessionContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<Privateroute />}>
              <Route path="editProfile" element={<ShowCourses />} />
              <Route path="dashboard" element={<CreateCourse />} />
            </Route>
          </Routes>
        </Router>
      </SessionContextProvider>
    </ThemeProvider>
  );
}

export default App;