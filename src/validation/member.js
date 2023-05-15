export function roleValidation(role) {
	let errors = []
	
	if (role === null || role === "") {
		errors = ['This field must be filled in']
	} else {
		errors = null
	}
	
	return errors
}

export function userValidation(user) {
	let errors = []
	
	if (user === null || user === "") {
		errors = ['This field must be filled in']
	} else {
		errors = null
	}
	
	return errors
}