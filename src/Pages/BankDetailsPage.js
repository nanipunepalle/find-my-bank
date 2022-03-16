import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MobileRowView from "../Components/MobileRowView";

function BankDetailsPage(props) {
    const { ifsc } = useParams();
    const navigate = useNavigate()

    const city = localStorage.getItem("currentCity");
    const banksList = JSON.parse(localStorage.getItem(city));
    const bank = banksList.find((b) => { return b.ifsc === ifsc });

    const handleCloseButton = () => {
        navigate(-1);
    }
    return (
        <div>
            <div className="top-nav-bar">
                <h2 className="page-title">{bank.bank_name}</h2>
            </div>
            <div style={{clear: "both"}}></div>
            <button style={{ position: "fixed", top: "50px", right: "0px" }} onClick={handleCloseButton}>CLOSE</button>
            <MobileRowView bank={bank}></MobileRowView>
        </div>
    )
}

export default BankDetailsPage;

