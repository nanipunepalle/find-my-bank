import React from "react";
import AllBanksPage from "./AllBanksPage";
import FavoritesPage from "./FavoritesPage";

import "./Home.css"

function Home() {

    const [favoriteActive, setFavoriteActive] = React.useState(false);

    return (<div>
        <div id="navbar">
            <label className="page-title">FIND YOUR BANK</label>
            <a className={favoriteActive ? "active" : ""} onClick={() => { setFavoriteActive(true) }}>Favorites</a>
            <a className={!favoriteActive ? "active" : ""} onClick={() => setFavoriteActive(false)}>All Banks</a>
        </div>
        {/* <div style={{ clear: "both" }}></div>
        <div className="top-nav-bar">
            <h2 className="page-title">FIND YOUR BANK</h2>
            <div className="menu-links">
                <button className={!favoriteActive ? "btn btn-outline-primary shadow-none active-button" : "btn btn-outline-primary button"} onClick={() => { setFavoriteActive(false) }}>All Banks</button>
                <button className={favoriteActive ? "btn btn-outline-primary  shadow-none active-button" : "btn btn-outline-primary button"} onClick={() => setFavoriteActive(true)}>Favorites</button>
            </div>
        </div>
        <div style={{ clear: "both" }}></div> */}
        <div style={{ clear: "both" }}></div>
        {!favoriteActive && <AllBanksPage></AllBanksPage>}
        {favoriteActive && <FavoritesPage></FavoritesPage>}
    </div>)
}

export default Home;