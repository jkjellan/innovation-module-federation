import axios from 'axios';

export function api(endpoint, req) {
	return new Promise(((resolve, reject) => {
		axios.post('/api/' + endpoint, req).then((response) => {
			resolve(response.data);
		})
			.catch((error) => {
				console.log('apiPost error: ', error);
				reject(error);
			})
	}));
}

export function apiGet(endpoint) {
	return new Promise(((resolve, reject) => {
		axios.get('/api/' + endpoint)
		.then((response) => {
			resolve(response.data);
		})
		.catch((error) => {
			console.log(error);
			reject(error);
		})
	}));
}

export function apiSync(endpoint, req) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/' + endpoint, false);
	xhr.setRequestHeader('Accept', '*/*');
	xhr.setRequestHeader('Content-Type', "application/json");
	xhr.send(JSON.stringify(req));
}

export function getAuth() {
	return new Promise((resolve, reject) => {
		axios.get('/api/userAuth')			
		.then((response) => {
			resolve(response);
		})
		.catch((error) => {
			console.log(error);
			reject(error);
		})
	});
}