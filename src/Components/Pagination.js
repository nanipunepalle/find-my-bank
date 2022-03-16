import React from "react";

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';

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
                <p className="inline txt">Rows per page: <span><input type="number" onChange={handleRowsInput} value={rowsPerPage} style={{ width: "50px" }}></input></span></p>
                <IconButton onClick={handlePrevButton}>
                    <ChevronLeftIcon className="inline arrow-button" fontSize="large"></ChevronLeftIcon>
                </IconButton>
                <p className="inline txt">{props.lower + " - " + (props.upper < props.filteredBankList.length ? props.upper : props.filteredBankList.length) + " of " + props.filteredBankList.length}</p>
                {/* <p className="inline arrow-button" onClick={handleNextButton}><i class='fas fa-angle-right'></i></p> */}
                <IconButton onClick={handleNextButton}>
                    <ChevronRightIcon className="inline arrow-button" fontSize="large"></ChevronRightIcon>
                </IconButton>
            </div>
        </React.Fragment>
    )
}

export default Pagination;