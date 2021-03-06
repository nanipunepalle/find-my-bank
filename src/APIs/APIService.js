
const url = "https://vast-shore-74260.herokuapp.com/banks?city=";
const cities = ["BENGALURU", "MUMBAI", "CHENNAI", "HYDERABAD", "DELHI"];
const categories = ["IFSC", "BRANCH", "BANK_NAME", "BANK_ID", "ADDRESS"];


const getBankData = (city, cb) => {
    try {
        fetch(`${url}${city}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(response => {
            // console.log(response)
            cb("success", response)
        }).catch(error=>{
            console.log(error)
            cb("error",error)
        })
    }
    catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    cities: cities,
    categories: categories,
    getBankData: getBankData
}