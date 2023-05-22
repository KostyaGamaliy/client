<template>
	<div>
		<router-view/>
	</div>
</template>

<script>
import pusher from "@/services/pusher";
import emitter from 'tiny-emitter/instance';
import {useProjectStore} from "@/store/Project";
import {mapActions} from "pinia";
export default {
	name: 'App',
	
	data() {
		return {
			channel: null,
		}
	},
	
	created() {
		pusher.connection.bind('connected', () => {
			this.channel = pusher.subscribe('pms');
			this.channel.bind('pdf-ready', data => {
				emitter.emit('pdf-url-updated', data.pdf_url);
			});
		});
	},
	
	methods: {
		...mapActions(useProjectStore, ['storePdfPath']),
	},
}
</script>
