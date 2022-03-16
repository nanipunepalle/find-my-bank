import React from "react";
import AllBanksPage from "./AllBanksPage";
import FavoritesPage from "./FavoritesPage";

import "./Home.css"

function Home() {

    const [favoriteActive, setFavoriteActive] = React.useState(false);

    return (<div>
        <div id="navbar">
            <label className="page-title">FIND YOUR BANK</label>
            <button className={favoriteActive ? "active-button" : ""} onClick={() => { setFavoriteActive(true) }}>Favorites</button>
            <button className={!favoriteActive ? "active-button" : ""} onClick={() => setFavoriteActive(false)}>All Banks</button>
        </div>
        <div style={{ clear: "both" }}></div>
        {!favoriteActive && <AllBanksPage></AllBanksPage>}
        {favoriteActive && <FavoritesPage></FavoritesPage>}
    </div>)
}

export default Home;