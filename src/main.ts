
import App from '@/App.svelte';
import { authCallback } from '@helpers/auth';

let app;

const isLoginCallback = window.location.href.includes('/#login');

if (isLoginCallback) {
	authCallback();
} else {
	app = new App({
		target: document.body,
		props: {
			loadingAuth: true,
		}
	});
}

export default app;