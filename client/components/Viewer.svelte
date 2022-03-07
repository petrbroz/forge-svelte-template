<script>
    import { onMount, createEventDispatcher } from 'svelte';

    export let getAccessToken;
    export let urn = '';

    async function _getAccessToken(callback) {
        const token = await getAccessToken();
        callback(token.access_token, token.expires_in);
    }

    function initViewer(container) {
        return new Promise(function (resolve, reject) {
            Autodesk.Viewing.Initializer({ getAccessToken: _getAccessToken }, function () {
                const viewer = new Autodesk.Viewing.GuiViewer3D(container);
                viewer.start();
                resolve(viewer);
            });
        });
    }

    function loadModel(viewer, urn) {
        return new Promise(function (resolve, reject) {
            function onDocumentLoadSuccess(doc) {
                viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry())
                    .then(resolve)
                    .catch(reject);
            }
            function onDocumentLoadFailure(code, message, errors) {
                reject(message);
            }
            Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
        });
    }

    let dispatch = createEventDispatcher();
    let container;
    let viewer;
    let mounted = false;

    $: if (viewer && urn) {
        loadModel(viewer, urn);
    }

    onMount(async function () {
        mounted = true;
        if (window.hasOwnProperty('Autodesk')) {
            setup();
        }
    });

    async function onScriptLoaded() {
        if (mounted && !viewer) {
            setup();
        }
    }

    async function setup() {
        viewer = await initViewer(container);
        viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function (ev) {
            const dbids = viewer.getSelection();
            dispatch('selectionChanged', { dbids });
        });
    }
</script>

<svelte:head>
	<link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.css">
	<script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js" on:load={onScriptLoaded}></script>
</svelte:head>

<div bind:this={container}>
</div>

<style>
</style>