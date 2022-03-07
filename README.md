# forge-svelte-template

Minimal template for [Autodesk Forge](https://forge.autodesk.com) applications built with [Svelte](https://svelte.dev)
on the client side and [Express.js](https://expressjs.com/) on the server side.

## Prerequisites

- Forge app credentials (see [tutorial](https://forge.autodesk.com/en/docs/oauth/v2/tutorials/create-app))
- [Node.js](https://nodejs.org/en/download) (preferrably the LTS version) and [Yarn](https://yarnpkg.com/getting-started/install)

## Running locally

- Clone this repository
- Install dependencies: `yarn install`
- Configure the following environment variables:
    - `FORGE_CLIENT_ID` - client ID of your Forge application
    - `FORGE_CLIENT_SECRET` - client secret of your Forge application
    - `FORGE_BUCKET` - an existing Forge bucket with models to preview
- Run the application: `yarn run dev` (if you want to auto-rebuild client side code on changes)
    or simply `yarn run serve`

> Tip: if you are using [Visual Studio Code](https://code.visualstudio.com), store the environment variables
> in a _.env_ file in the project folder, use the launch configuration in defined in [./.vscode/launch.json](./.vscode/launch.json).