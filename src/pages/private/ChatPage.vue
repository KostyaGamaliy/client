<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Project Chat
			</div>
		</div>
		
		<div class="bg-dark flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen">
			
			<div class="overflow-y-auto pt-14 pb-6">
				<ul v-if="messages" class="mr-20">
					<li v-for="message in messages" :key="message.id" class="">
						
						<div class="d-flex">
							<p class="text-primary mr-2">{{ message.created_at }} </p>
							<p class="text-warning fs-5">{{ message.sender }}</p>
						</div>
						
						<div class="d-inline-block bg-primary rounded-lg px-4">
							<p class="text-dark">{{ message.message }}</p>
						</div>
					
					</li>
				</ul>
			</div>
			
			<div class="border-top-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
				<div class="d-flex">
					<input v-model="message" type="text" placeholder="Message" @keyup.enter="sendMessage" class="w-full form-control">
					
					<div class="d-flex align-items-center ms-2">
						<button @click="sendMessage" class="btn btn-primary rounded-full h-12 w-12">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
								<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import {useAuthStore} from "@/store/Auth";
import {mapState} from "pinia";

export default {
	name: "ChatPage",
	
	data() {
		// let receiver_id = this.$route.params.id;
		
		return {
			messages: null,
			message: "",
			receiver_id: 2,
			errors: {
				message: "",
			},
			errorsStatus: [],
		};
	},
	
	created() {
		this.listen();
	},
	
	computed: {
		...mapState(useAuthStore, ["user"]),
	},
	
	methods: {
		sendMessage() {
			
			let user_message = {
				receiver_id: this.receiver_id,
				message: this.message,
			};
			AxiosInstance
				.post(
					"/chat/send",
					user_message,
				)
				.then((response) => {
					if (!response) {
						return;
					}
					this.message = '';
					this.messages.push(response.data.data);
					
				})
				.catch((errors) => {
					console.log(errors)
				});
			
		},
		
		getMessages() {
			AxiosInstance
				.get(`/chat/${this.$route.params.id}/${this.receiver_id}`)
				.then((response) => {
					if (!response) {
						return response;
					}
					this.messages = response.data.data;
				})
				.catch((errors) => {
					console.log(errors)
				});
		},
		
		listen() {
			let channel = window.Echo.channel(`chat.${this.user.id}`);
			channel.listen(".new-message", (data) => {
				this.messages.push({
					sender: data.sender,
					message: data.message,
					created_at: data.created_at
				});
				console.log('msg', data);
				
			});
		},
	},
	
	mounted() {
		this.getMessages();
	},
}
</script>

<style scoped>

</style>