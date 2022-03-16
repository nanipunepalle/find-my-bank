import { IconButton } from "@material-ui/core";
import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MobileRowView from "../Components/MobileRowView";
import './BankDetailsPage.css';
import Close from '@material-ui/icons/Close';

function BankDetailsPage(props) {
    const { ifsc } = useParams();
    const navigate = useNavigate()

    const city = localStorage.getItem("currentCity");
    const banksList = JSON.parse(localStorage.getItem(city));
    const bank = banksList.find((b) => { return b.ifsc === ifsc });


    var favorites = null;
    if (localStorage.getItem("favorites") != null) {
        favorites = JSON.parse(localStorage.getItem("favorites"))
    }

    const [added, setAdded] = React.useState(false)

    React.useEffect(() => {
        if (favorites != null) {
            if (favorites[city] != null) {
                if (favorites[city].includes(bank.ifsc)) {
                    setAdded(true)
                }
            }
        }

    }, [bank, city, favorites])

    const handleCloseButton = () => {
        navigate(-1);
    }

    const handleFavoriteButton = () => {
        var fav = {}
        if (!added) {
            if (favorites) {
                if (favorites[city] != null) {
                    fav = {}
                    favorites[city].push(bank.ifsc);
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                }
                else {
                    favorites[city] = [bank.ifsc]
                    localStorage.setItem("favorites", JSON.stringify(favorites));
                }
            }
            else {
                console.log("ccc")
                fav = { [city]: [bank.ifsc] };
                localStorage.setItem("favorites", JSON.stringify(fav))
            }
            setAdded(true);
        }
        else {
            const i = favorites[city].indexOf(bank.ifsc);
            favorites[city].splice(i, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setAdded(false);
        }
    }

    return (
        <div>
            <div id="navbar">
                <h2 >{bank.bank_name}</h2>
            </div>
            <div style={{ clear: "both" }}></div>
            {/* <span className="close-icon" onClick={handleCloseButton}><i class="fa fa-close"></i></span> */}
            <IconButton onClick={handleCloseButton} ><Close fontSize="large" className="close-icon" ></Close></IconButton>
            <MobileRowView bank={bank}></MobileRowView>
            <button className="btn btn-primary fav-button" onClick={handleFavoriteButton}>{added ? "Remove from Favorites" : "Add To Favorites"}</button>
        </div>
    )
}

export default BankDetailsPage;