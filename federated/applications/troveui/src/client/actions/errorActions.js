/* Action Types */
export const SET_ERROR = 'SET_ERROR';


export const setError = error => {
	return {
		type: SET_ERROR,
		error
	};
};