import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import './App.css'

// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)\
const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};


function App() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login auth={setIsAuthenticated}/>} />
                <Route path="/register" element={<Register />} />
                <Route element={<PrivateWrapper />} >
                  <Route path="/about" element={<CreateCourse />} />
                </Route>
                <Route element={<PrivateWrapper />} >
                  <Route path="/courses" element={<ShowCourses />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;