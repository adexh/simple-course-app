import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import './App.css'
import { Privateroute } from "./utils/private_route";
import { SessionContextProvider } from "./contexts/auth_context";
// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)\

function App() {
  return (
    <SessionContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logged" element={<Privateroute />}>
              <Route path="courses" element={<ShowCourses />} />
              <Route path="create" element={<CreateCourse />} />
            </Route>
          </Routes>
        </Router>
    </SessionContextProvider>
  );
}

export default App;