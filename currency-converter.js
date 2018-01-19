// USD CAD 23
// 23 USD is worth 28 CAD. You can Spend these in the following countries
const axios = require('axios');

const getExchangeRate = async(from, to) => {
   //this uses a most robust error handling 
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
        const rate =  response.data.rates[to];

        if(rate){
        	return rate;
        } else {
        	//this triggers the catch block right below 
        	throw new Error();
        }

    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }

};

const getCountries = async(currencyCode) => {

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        //using map because we will get the array back
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get Countries that use ${currencyCode}`);
    }
};


const convertCurrencyAlt = async(from, to, amount) => {

    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangeAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', \n')}`;
}


convertCurrencyAlt('USD', 'EUR', 100).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e.message);
});

// getCountries('USD').then((countries)=>{
// 	console.log(countries);
// });

// getExchangeRate('USD','EUR').then((rate)=>{
// 	console.log(rate);
// }).catch((e) => {
//     console.log(e.message);
// });