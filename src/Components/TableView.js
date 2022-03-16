import React from "react";
import { useNavigate } from "react-router-dom";

import APIService from "../APIs/APIService";
import MobileRowView from "../Components/MobileRowView";
import Pagination from "../Components/Pagination";
import "./TableView.css";


function TableView(props) {

    const navigate = useNavigate();

    const [city, setCity] = React.useState("BENGALURU");
    const [bankList, setBankList] = React.useState([]);
    const [filteredBankList, setFilteredBankList] = React.useState([]);
    const [searchCategory, setSearchCategory] = React.useState("IFSC");
    const [pagination, setPagination] = React.useState({ lower: 1, upper: 10 });
    const { lower, upper } = pagination;
    // var favorites = null;
    


    React.useEffect(() => {
        const banks = localStorage.getItem(city)
        if(banks){
            setBankList(JSON.parse(banks));
            // setFilteredBankList(JSON.parse(banks))
        }
        if(localStorage.getItem("favorites")!=null){
            var favorites = JSON.parse(localStorage.getItem("favorites"));
            if(favorites[city]!=null){
                const b = JSON.parse(banks);
                setFilteredBankList(b.filter((val)=>{return favorites[city].includes(val.ifsc)}));
            }
        }
        // APIService.getBankData(city, (response) => {
        //     if (response.status === 200) {
        //         response.json().then(value => {
        //             setBankList(value);
        //             localStorage.setItem(city,JSON.stringify(value));
        //             localStorage.setItem("currentCity", city);
        //             setFilteredBankList(value);
        //         })
        //     }
        // })
        return () => {
            setBankList([]);
            setFilteredBankList([]);
        }
    }, [city])


    const handleBankCityChange = (e) => {
        console.log(e.target.value)
        setCity(e.target.value.toUpperCase());
    }

    const handleCategoryChange = (e) => {
        setSearchCategory(e.target.value);
        setFilteredBankList(bankList)
    }

    const handleSearchInputChange = (e) => {
        setPagination({ lower: 1, upper: 10 });

        setFilteredBankList(bankList.filter(bank => { return bank[searchCategory.toLowerCase()].toString().includes(e.target.value.toUpperCase()) }))
    }

    const handleRowClick = (ifsc_code) => ()=> {
        localStorage.setItem("currentCity",city)
        navigate("/find-my-bank/bank-details/"+ifsc_code)
    }

    return (
        <div className="root-div">
            <div className="filter-div">
                {/* <p className="inline">All Banks</p> */}

                <div className="filter-sub-div">
                    <select name="banks" id="banks" onChange={handleBankCityChange}>
                        {APIService.cities.map((val) => {
                            return (<option key={val} value={val} id={val}>{val}</option>)
                        })}
                    </select>
                    <select disabled={true} name="category" id="category" onChange={handleCategoryChange}>
                        {APIService.categories.map((val) => {
                            return (<option key={val} value={val} id={val}>{val.toUpperCase()}</option>)
                        })}
                    </select>
                    <input disabled={true} className="search-field" type="text" id="search-field" placeholder="search" onChange={handleSearchInputChange}></input>
                </div>
            </div>

            <div className="table-root-div">
                <div className="table-div">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "30%" }}>Bank</th>
                                <th style={{ width: "10%" }}>IFSC</th>
                                <th style={{ width: "10%" }}>Branch</th>
                                <th style={{ width: "10%" }}>Bank ID</th>
                                <th style={{ width: "40%" }}>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBankList.slice(lower - 1, upper).map((val) => {
                                return (<tr key={val.ifsc} onClick={handleRowClick(val.ifsc)}>
                                    <td>{val.bank_name}</td>
                                    <td>{val.ifsc}</td>
                                    <td>{val.branch}</ td>
                                    <td>{val.bank_id}</td>
                                    <td>{val.address}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>

                <div style={{ float: "right", fontSize: "15px", padding: "30px" }}>
                    <Pagination filteredBankList={filteredBankList} setPagination={setPagination} lower={lower} upper={upper}></Pagination>
                </div>
            </div>
            <div className="mobile-div">
                <div>
                    {
                        filteredBankList.slice(lower - 1, upper).map(val => {
                            return (<MobileRowView key={val.ifsc} bank={val} handleRowClick={handleRowClick(val.ifsc)}></MobileRowView>)
                        })
                    }
                </div>
                <div className="mobile-pagination-div">
                    <Pagination filteredBankList={filteredBankList} setPagination={setPagination} lower={lower} upper={upper}></Pagination>
                </div>
            </div>
        </div>
    )
}

export default TableView;
