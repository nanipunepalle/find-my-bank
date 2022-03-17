import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import Home from './Pages/Home';
import BankDetailsPage from './Pages/BankDetailsPage';
import BanksContext from './Contexts/BanksContext';
import APIService from './APIs/APIService';
import AlertToast from './Components/AlertToast';

function App() {

  const [banks, setBanks] = React.useState([]);
  const [city, setCity] = React.useState("BENGALURU");
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    message: 'success',
    type: 'error'
});

  const contextValue = { banks, setBanks, city, setCity, loading, setLoading };

  React.useEffect(() => {
    setLoading(true);
    APIService.getBankData(city, (message,response) => {
      console.log(response.status)
      // if(message=="success")
      if (message==="success" && response.status === 200) {
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
      //   setState({
      //     ...state,
      //     open: true,
      //     message: "Something went wrong try again",
      //     type: "error",
      // })
      }
    })
    // eslint-disable-next-line
  }, [city])

  return (
    <div>
      <AlertToast state={state} setState={setState}></AlertToast>
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