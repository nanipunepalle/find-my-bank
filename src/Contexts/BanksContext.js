import React from "react";

const BanksContext = React.createContext({
    banks: null,
    setBanks: ()=>{},
    city: null,
    setCity: ()=> {},
    loading: false,
    setLoading: ()=>{}
});

export default BanksContext;