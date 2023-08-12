import "./App.css";

import React from "react";
//react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

//components
import Header from "./components/Header";

//react-toastify
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
