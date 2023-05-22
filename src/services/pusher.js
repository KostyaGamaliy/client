import Pusher from 'pusher-js';

const pusher = new Pusher('0ef8d31fe818b7949d4b', {
	cluster: 'eu',
});

pusher.logToConsole = true;

export default pusher;