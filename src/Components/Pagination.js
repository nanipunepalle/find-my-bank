import React from "react";

import './Pagination.css';
function Pagination(props) {

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handlePrevButton = () => {
        if (props.lower - rowsPerPage <= 0) {
            props.setPagination({ lower: 1, upper: rowsPerPage });
        }
        else {
            props.setPagination({ lower: props.lower - rowsPerPage, upper: props.upper - rowsPerPage });
        }
    }

    const handleNextButton = () => {
        if (props.lower + rowsPerPage <= props.filteredBankList.length) {
            props.setPagination({ lower: props.lower + rowsPerPage, upper: props.upper + rowsPerPage });
        }
    }

    const handleRowsInput = (e) => {
        setRowsPerPage(parseInt(e.target.value))
        props.setPagination({ lower: 1, upper: parseInt(e.target.value) });
    }

    return (
        <React.Fragment>
            <p className="inline">Rows per page: <span><input type="number" onChange={handleRowsInput} value={rowsPerPage} style={{ width: "30px" }}></input></span></p>
            <button className="inline" onClick={handlePrevButton}>PREV</button>
            <p className="inline">{props.lower + " - " + (props.upper < props.filteredBankList.length ? props.upper : props.filteredBankList.length) + " of " + props.filteredBankList.length}</p>
            <button className="inline" onClick={handleNextButton}>NEXT</button>
        </React.Fragment>
    )
}

export default Pagination;