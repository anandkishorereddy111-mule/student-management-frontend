import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CoursesPage from "./pages/CoursesPage";
import About from "./pages/About";
import AdminPage from "./pages/AdminPage";
import "./theme.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPage onEdit={() => {}} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;