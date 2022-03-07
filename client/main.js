import App from './components/App.svelte';
import { loadModels, getAccessToken } from './services/forge.js';

const app = new App({
	target: document.body,
	props: {
		models: loadModels(),
		getAccessToken
	}
});

export default app;
