import React from "react";
import AllBanksPage from "./AllBanksPage";

import "./Home.css"

function Home() {
    return (<div>
        <div className="top-nav-bar">
            <h2 className="page-title">FIND YOUR BANK</h2>
            <h2 className="menu-links">Favorites</h2>
            <h2 className="menu-links">All Banks</h2>
        </div>
        <div style={{clear: "both"}}></div>
        <AllBanksPage></AllBanksPage>
    </div>)
}

export default Home;