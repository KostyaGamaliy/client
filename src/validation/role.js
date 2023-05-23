export function nameValidation(name) {
	let errors = []
	
	if (name === null || name === "") {
		errors = ['This field must be filled in']
	} else if (name.length < 3) {
		errors = ['This field must be longer than 3 characters']
	} else if (name.length > 100) {
		errors = ['This field must be less than 100 characters long']
	}	else {
		errors = null
	}
	
	return errors
}

export function deleteRoleValidation(role) {
	let errors = []
	
	if (role === null || role === "") {
		errors = ['This field must be filled in']
	} else {
		errors = null
	}
	
	return errors
}