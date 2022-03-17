import React from "react";
import { useNavigate } from "react-router-dom";

import APIService from "../APIs/APIService";
import AlertToast from "../Components/AlertToast";
import MobileRowView from "../Components/MobileRowView";
import Pagination from "../Components/Pagination";
import BanksContext from "../Contexts/BanksContext";
import './AllBanksPage.css'



function AllBanksPage(props) {

    const navigate = useNavigate();

    const { city, setCity, setBanks, loading } = React.useContext(BanksContext)
    // const [city, setCity] = React.useState("BENGALURU");
    const [bankList, setBankList] = React.useState([]);
    const [filteredBankList, setFilteredBankList] = React.useState([]);
    const [searchCategory, setSearchCategory] = React.useState("IFSC");
    const [pagination, setPagination] = React.useState({ lower: 1, upper: 10 });
    const { lower, upper } = pagination;
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: 'success',
        type: 'error'
    });


    React.useEffect(() => {
        console.log(city)
        const banks = localStorage.getItem(city)
        if (banks != null) {
            setBankList(JSON.parse(banks));
            setFilteredBankList(JSON.parse(banks))
        }
        APIService.getBankData(city, (message,response) => {
            if (response.status === 200) {
                response.json().then(value => {
                    setBankList(value);
                    setBanks(value);
                    setCity(city)
                    localStorage.setItem(city, JSON.stringify(value));
                    localStorage.setItem("currentCity", city);
                    setFilteredBankList(value);
                })
            }
            else {
                setState({
                    ...state,
                    open: true,
                    message: "Something went wrong try again",
                    type: "error",
                })
            }
        })
        return () => {
            setBankList([]);
            setFilteredBankList([]);
        }
        // eslint-disable-next-line
    }, [city, setBanks, setCity])


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
        if (searchCategory === "IFSC") {
            if (e.target.value.length > 11) {
                setState({
                    ...state,
                    open: true,
                    message: "Enter valid ifsc code",
                    type: "error",
                })
            }
        }
        setFilteredBankList(bankList.filter(bank => { return bank[searchCategory.toLowerCase()].toString().includes(e.target.value.toUpperCase()) }))
    }

    const handleRowClick = (ifsc_code) => () => {
        localStorage.setItem("currentCity", city)
        navigate("/find-my-bank/bank-details/" + ifsc_code)
    }

    return (
        <div className="root-div">
            <AlertToast state={state} setState={setState}></AlertToast>
            <div className="filter-div">
                {/* <p className="inline">All Banks</p> */}

                <div className="filter-sub-div">
                    <select name="banks" id="banks" value={city} onChange={handleBankCityChange}>
                        {APIService.cities.map((val) => {
                            return (<option key={val} value={val} id={val}>{val}</option>)
                        })}
                    </select>
                    <select name="category" id="category" onChange={handleCategoryChange}>
                        {APIService.categories.map((val) => {
                            return (<option key={val} value={val} id={val}>{val.toUpperCase()}</option>)
                        })}
                    </select>
                    <input className="search-field" type="text" id="search-field" placeholder="search" onChange={handleSearchInputChange}></input>
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
                            {loading && <tr><td colSpan={5}><p style={{ textAlign: "center" }}>loading</p></td></tr>}
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
                <div className="mobile-filter-sub-div">
                    <select name="banks" id="banks" value={city} onChange={handleBankCityChange}>
                        {APIService.cities.map((val) => {
                            return (<option key={val} value={val} id={val}>{val}</option>)
                        })}
                    </select>
                    <select name="category" id="category" onChange={handleCategoryChange}>
                        {APIService.categories.map((val) => {
                            return (<option key={val} value={val} id={val}>{val.toUpperCase()}</option>)
                        })}
                    </select>
                    <input className="search-field" type="text" id="search-field" placeholder="search" onChange={handleSearchInputChange}></input>
                </div>
                <div>
                    {loading && <p style={{ textAlign: "center" }}>loading</p>}
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

export default AllBanksPage;
