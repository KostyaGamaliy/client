export function nameValidation(name) {
	let errors = []
	
	if (name === null || name === "") {
		errors = ['This field must be filled in']
	} else if (name.length < 3) {
		errors = ['This field must be longer than 3 characters']
	} else if (name.length > 50) {
		errors = ['This field must be less than 50 characters long']
	}	else {
		errors = null
	}
	
	return errors
}

export function descriptionValidation(desc) {
	let errors = []
	
	if (desc === null || desc === "") {
		errors = ['This field must be filled in']
	} else if (desc.length < 5) {
		errors = ['This field must be longer than 5 characters']
	} else if (desc.length > 1000) {
		errors = ['This field must be less than 1000 characters long']
	}	else {
		errors = null
	}
	
	return errors
}

export function usersValidation(user) {
	let errors = []
	
	if (user === null || user === "") {
		errors = ['This field must be filled in']
	} else {
		errors = null
	}
	
	return errors
}

export function statusValidation(status) {
	let errors = []
	
	if (status === null || status === "") {
		errors = ['This field must be filled in']
	} else {
		errors = null
	}
	
	return errors
}