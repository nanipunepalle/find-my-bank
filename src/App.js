import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Home from './Pages/Home';
import BankDetailsPage from './Pages/BankDetailsPage';
import BanksContext from './Contexts/BanksContext';
import APIService from './APIs/APIService';

function App() {

  const [banks, setBanks] = React.useState([]);
  const [city, setCity] = React.useState("BENGALURU");
  const [loading, setLoading] = React.useState(false);

  const contextValue = { banks, setBanks, city, setCity, loading, setLoading };

  React.useEffect(() => {
    setLoading(true);
    APIService.getBankData(city, (response) => {
      if (response.status === 200) {
        response.json().then(value => {
          setBanks(value);
          localStorage.setItem(city, JSON.stringify(value));
          localStorage.setItem("currentCity", "BENGALURU");
          localStorage.setItem("time-stamp",Date.now());
          setLoading(false);
        })
      }
      else {
        setLoading(false);
      }
    })
  }, [city])

  return (
    <div>
      <Router>
        <BanksContext.Provider value={contextValue}>
          <Routes>

            <Route exact path="/" element={<Navigate replace to="/find-my-bank/all-banks"></Navigate>}></Route>
            <Route exact path="/find-my-bank/all-banks" element={<Home></Home>}></Route>
            <Route exact path="/find-my-bank/bank-details/:ifsc" element={<BankDetailsPage></BankDetailsPage>}></Route>
            {/* <Route exact path="/*" element={<Navigate replace to="/"></Navigate>}></Route> */}
            <Route exact path="*" element={<Navigate replace to="/"></Navigate>}></Route>

          </Routes>
        </BanksContext.Provider>
      </Router>
    </div>
  );
}

export default App;