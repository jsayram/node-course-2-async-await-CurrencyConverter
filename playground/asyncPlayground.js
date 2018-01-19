//async functions always return promises , the two functions (#1, and #2) below are identical in functinality
// #1  
()=>{
	return new Promise((resolve,reject) =>{
		//can also reject('This is an error')

		//this resolves
		resolve('Mike');
	});
};
//#2 
const getStatusAlt = async (userId) =>{
	//this is rejecting
	throw new Error('This is an error')
	
	//this will get resolved , hence returning a promise
	return 'Mike'

};

//so beccause it returns a promise we can just do this 
getStatusAlt().then((name) =>{
	console.log(name);
})

console.log(getStatusAlt());

//----------------------------------------------------------------------------------------------------------------

/*THEFORE THESE TWO FUNCTIONS ARE EQUAL AND ASYNC AWAIT MAKES IT EASIER*/

//first way of doing it
const getStatus = (userId) =>{
	var user;
	return getUser(userId).then((tempUser)=>{
		user = tempUser;
		return getGrades(user.schoolId);
	}).then((grades) =>{
		//average
		let average = 0;

		if(grades.length > 0){
			average = grades.map((grade)=> grade.grade).reduce((a,b) => a + b) / grades.length;
		}
		
		return `${user.name} has a ${average}% in the class.`;

	});
};

//alternate way of doing the above but much easier, when you get reject you have access to it in the catch((e)=>{})
// can only use await inside a async fucntions 
const getStatusAlt = async (userId) =>{
	const user = await getUser(userId);
	const grades = await getGrades(user.schoolId);

	let average = 0;

		if(grades.length > 0){
			average = grades.map((grade)=> grade.grade).reduce((a,b) => a + b) / grades.length;
		}
		
		return `${user.name} has a ${average}% in the class.`;

	console.log(user,grades);
};


//so beccause it returns a promise we can just do this 
getStatusAlt(1).then((name) =>{
	console.log(name);
}).catch((e)=>{
	console.log(e);
});


// getStatus(2).then((status)=>{
// 	console.log(status);
// }).catch((e)=>{
// 	console.log(e);
// });



//------------------------------------------------------------------------------------------------------------------
//SHOWING HOW PROMISES WORK AND HOW ASYNC AWAIT ARE IDENTICAL IN FUNCTIONLAITY WITH A COUPLE OF EXAMPLES
/* These (#1 and #2) are identical in fucntionality */
// USD CAD 23
// 23 USD is worth 28 CAD. You can Spend these in the following countries
const axios = require('axios');
// const getExchangeRate = (from, to) => {
//     //.then returns a promise to axios 
//     return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
//         return response.data.rates[to];
//     });
// };

const getExchangeRate = async (from, to) => {
    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    return response.data.rates[to];
};

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {

//         //using map because we will get the array back
//         return response.data.map((country) => country.name);
//     });
// }

const getCountries =  async (currencyCode) => {
     try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        //using map because we will get the array back
        return response.data.map((country) => country.name);
    } catch (e) {
    	throw new Error(`Unable to get Countries that use ${currencyCode}`);
    }
};

//#1
const convertCurrency = (from, to, amount) => {
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangeAmount = amount * rate;

        return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', \n')}`;
    });
}


//#2 
const convertCurrencyAlt = async(from, to, amount) => {

    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);

    const exchangeAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', \n')}`;
}

// convertCurrency('CAD', 'USD', 100).then((status) => {
//     console.log(status);
// });

convertCurrencyAlt('CAD', 'USD', 100).then((status) => {
    console.log(status);
}).catch((e)=>{
	console.log(e.message);
});

