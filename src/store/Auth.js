import {defineStore} from "pinia";
import AxiosInstance from "@/services/AxiosInstance";
import Swal from "sweetalert2";
import router from "@/router"

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: {},
		token: localStorage.getItem("token"),
	}),
	getters: {
		loggedIn: (state) => state.token !== null
	},
	actions: {
		loginUser(data) {
			AxiosInstance.post('/auth/login', {
				...data
			}).then((response) => {
				this.token = response.data.token;
				this.user= response.data.user;
				
				console.log(this.token, this.user)
				
				localStorage.setItem('token', this.token);
				router.push('/');
			})
				.catch(()=>{
					Swal.fire({
						icon: 'error',
						title: 'Something went wrong...',
						text: 'Incorrect data entered!',
						timer: 2500,
						showConfirmButton: false,
					})
				})
		},
		
		registerUser(data) {
			AxiosInstance.post('/auth/register', {
				...data
			}).then((response) => {
				this.token = response.data.token;
				this.user= response.data.user;
				localStorage.setItem('token', this.token);
				router.push('/');
			})
				.catch(()=>{
					Swal.fire({
						icon: 'error',
						title: 'Something went wrong...',
						text: 'Incorrect data entered!',
						timer: 2500,
						showConfirmButton: false,
					})
				})
		},
		
		logout() {
			AxiosInstance.post('/auth/logout')
				.then(() => {
					this.user = {};
					this.token = null;
					localStorage.removeItem('token');
					router.push('/login');
				})
		},
		
		
	},
	persist: true,
})