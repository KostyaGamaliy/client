<template>
	<div class="relative">
		<header-app class="fixed z-10 top-0 left-0 w-screen border-bottom border-2 border-gray-200"></header-app>
		
		<div class="d-flex align-items-center justify-content-around">
			<div class="text-center display-4">
				Project Chat
			</div>
			
			<router-link :to=" { name: 'project-view', params: { id: this.$route.params.id } } "
			             class="btn btn-outline-secondary me-3">
				<i class="fa fa-arrow-left"></i> Back
			</router-link>
		</div>
		
		<div class="bg-dark flex-1 p-2 sm:p-6 justify-between flex flex-col h-screen border rounded mx-5 my-3">
			<div class="overflow-scroll pt-14 pb-6" style="max-height: 600px;" ref="messageContainer">
				<ul v-if="messages" class="px-4">
					<li v-for="message in messages" :key="message.id" class="d-flex flex-column my-2">
						
						<div v-if="userId === message.sender_id" class="text-end">
							<div class="d-flex justify-content-end flex-column">
								<p class="text-warning m-0">{{ message.sender }}</p>
								<p class="text-primary mb-2">{{ message.created_at }} </p>
							</div>
							
							<div class="d-inline-block bg-primary rounded-lg px-4 rounded">
								<p class="text-dark my-1">{{ message.message }}</p>
							</div>
						</div>
						
						<div v-else class="text-start">
							<div class="d-flex flex-column">
								<p class="text-warning m-0">{{ message.sender }}</p>
								<p class="text-primary mb-2">{{ message.created_at }}</p>
							</div>
							
							<div class="d-inline-block bg-primary rounded-lg px-4 rounded">
								<p class="text-dark my-1">{{ message.message }}</p>
							</div>
						</div>
						
					</li>
				</ul>
			</div>
			
			<div class="border-top-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
				<div class="d-flex">
					<input v-model="message" type="text" placeholder="Message" @keyup.enter="sendMessage" class="w-full form-control">
					
					<div class="d-flex align-items-center ms-2">
						<button @click="sendMessage" class="btn btn-primary rounded-full h-12 w-12">
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import AxiosInstance from "@/services/AxiosInstance";
import { useAuthStore } from "@/store/Auth";
import { mapState } from "pinia";
import router from "@/router";
import pusher from "@/services/pusher";

export default {
	name: "ChatPage",
	
	data() {
		return {
			messages: null,
			message: "",
			errors: {
				message: "",
			},
			errorsStatus: [],
			userId: null,
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
				sender_id: this.userId,
				project_id: parseInt(this.$route.params.id),
				message: this.message,
			};
			
			AxiosInstance
				.post("/chat/send", user_message)
				.then((response) => {
					// console.log(response)
					if (!response) {
						return;
					}
					this.message = '';
					this.scrollMessagesToBottom();
				})
				.catch((errors) => {
					console.log(errors)
				});
		},
		
		getMessages() {
			AxiosInstance
				.get(`/chat/${this.$route.params.id}/${this.userId}`)
				.then((response) => {
					if (!response) {
						return response;
					}
					this.messages = response.data.data;
					this.scrollMessagesToBottom();
				})
				.catch(() => {
					router.push('/404')
				});
		},
		
		listen() {
			let channel = window.Echo.channel('chat.' + parseInt(this.$route.params.id));
			channel.listen('.new-message', (data) => {
				console.log(data)
				this.messages.push({
					id: data.id,
					sender: data.sender,
					sender_id: data.sender_id,
					message: data.message,
					project_id: this.$route.params.id,
					created_at: data.created_at
				});
				
				this.scrollMessagesToBottom();
			});
		},
		
		scrollMessagesToBottom() {
			this.$nextTick(() => {
				const container = this.$refs.messageContainer;
				container.scrollTop = container.scrollHeight;
			});
		},
	},
	
	mounted() {
		const userData = JSON.parse(window.localStorage.getItem('auth'));
		this.userId = userData.user.id;
		this.getMessages();
	},
}
</script>

<style scoped>
</style>