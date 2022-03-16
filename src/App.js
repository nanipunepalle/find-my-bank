import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Home from './Pages/Home';
import BankDetailsPage from './Pages/BankDetailsPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/all-banks"></Navigate>}></Route>
          <Route exact path="/all-banks" element={<Home></Home>}></Route>
          <Route exact path="/bank-details/:ifsc" element={<BankDetailsPage></BankDetailsPage>}></Route>
          <Route exact path="*" element={<Navigate replace to="/all-banks"></Navigate>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
