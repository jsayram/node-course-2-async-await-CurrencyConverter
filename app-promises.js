const users = [{
	id: 1,
	name: 'Jose',
	schoolId: 101
},{
	id: 2,
	name: 'Jessica',
	schoolId: 999
}];

const grades = [{
	id: 1,
	schoolId: 101,
	grade: 86

},
{
	id: 2,
	schoolId: 999,
	grade: 100

},
{
	id: 3,
	schoolId: 101,
	grade: 80
}];

const getUser = (id) =>{
	return new Promise((resolve, reject)=>{
		const user = users.find((user)=> user.id === id);

		if(user){
			resolve(user);
		} else {
			reject(`Unable to find user with id of ${id}.`)
		}
	});
};

const getGrades = (schoolId) => {

	return new Promise((resolve, reject)=>{
		resolve(grades.filter((grade)=> grade.schoolId === schoolId));
	});
};

//first way of gettingStatus
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

// getGrades(101).then((grades)=>{
// 	console.log(grades);
// }).catch((e)=>{
// 	console.log(e);
// });

// getUser(1).then((user)=>{
// 	console.log(user);
// }).catch((e)=>{
// 	console.log(e);
// });