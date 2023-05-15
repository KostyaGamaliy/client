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

export function descriptionsValidation(desc) {
	let errors = []
	
	if (desc.length < 5) {
		errors = ['This field must be longer than 5 characters']
	} else if (desc.length > 1000) {
		errors = ['This field must be less than 1000 characters long']
	}	else {
		errors = null
	}
	
	return errors
}

export function imageValidation(file) {
	let errors = []
	
	if (file !== null) {
		const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i;
		const fileSize = file.size / 1024;
		
		if (!allowedExtensions.exec(file.name)) {
			errors = ['This field must be named with the extension: jpeg,png,jpg,gif,svg'];
		} else if (fileSize > 2048) {
			errors = ['The size of the picture must be less than 2048'];
		} else {
			errors = null
		}
	} else {
		errors = null
	}
	
	
	return errors
}