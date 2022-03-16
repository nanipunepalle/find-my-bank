import React from "react";
import './MobileRowView.css';

function MobileRowView(props) {
    const bank = props.bank;

    const handleClickButton = () => {
        props.handleRowClick();
    }
    return (
        <div className="mobile-card-div" onClick={handleClickButton}>
            <p><b>Bank</b></p>
            <p>{bank.bank_name}</p>
            <p><b>IFSC</b></p>
            <p>{bank.ifsc}</p>
            <p><b>Branch</b></p>
            <p>{bank.branch}</p>
            <p><b>ID</b></p>
            <p>{bank.bank_id}</p>
            <p><b>Address</b></p>
            <p>{bank.address}</p>
        </div>
    )
}

export default MobileRowView

