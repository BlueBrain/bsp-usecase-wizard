
import App from './App.svelte';

let app;

app = new App({
	target: document.body,
	props: {
		loadingAuth: true,
	}
});

export default app;
