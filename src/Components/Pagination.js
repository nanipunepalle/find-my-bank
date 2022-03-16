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
            <div className="pagination-root">
                <p className="inline">Rows per page: <span><input type="number" onChange={handleRowsInput} value={rowsPerPage} style={{ width: "50px" }}></input></span></p>
                <p className="inline arrow-button" onClick={handlePrevButton}><i class='fas fa-angle-left'></i></p>
                <p className="inline arrow-button"><i class="arrow right"></i></p>
                <p className="inline">{props.lower + " - " + (props.upper < props.filteredBankList.length ? props.upper : props.filteredBankList.length) + " of " + props.filteredBankList.length}</p>
                <p className="inline arrow-button" onClick={handleNextButton}><i class='fas fa-angle-right'></i></p>
            </div>
        </React.Fragment>
    )
}

export default Pagination;