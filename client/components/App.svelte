<script>
	import Viewer from './Viewer.svelte';

	export let models;
	export let getAccessToken;

	let urn;
</script>

<main>
	<div id="header">
		{#await models}
			<p>Loading models...</p>
		{:then list}
			<select id="models" bind:value={urn}>
				{#each list as model}
					<option value={model.urn}>{model.name}</option>
				{/each}
			</select>
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
	<div id="content">
		<Viewer {urn} {getAccessToken} on:selectionChanged={(ev) => console.log('Selected IDs: ' + ev.detail.dbids.join(','))} />
	</div>
</main>

<style>
	#header, #content {
		position: absolute;
		left: 0;
		right: 0;
	}

	#header {
		top: 0;
		height: 3em;
		display: flex;
		align-items: center;
		justify-content: end;
		padding: 0 1em;
	}

	#content {
		top: 3em;
		bottom: 0;
	}
</style>