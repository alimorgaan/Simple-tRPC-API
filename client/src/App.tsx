import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { trpc } from './trpc';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Protected from './components/Protected';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
