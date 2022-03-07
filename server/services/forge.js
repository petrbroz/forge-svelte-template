const { AuthenticationClient, DataManagementClient, urnify } = require('forge-server-utils');
const { FORGE_CLIENT_ID, FORGE_CLIENT_SECRET, FORGE_BUCKET } = require('../config.js');

let authenticationClient = new AuthenticationClient(FORGE_CLIENT_ID, FORGE_CLIENT_SECRET);
let dataManagementClient = new DataManagementClient({ client_id: FORGE_CLIENT_ID, client_secret: FORGE_CLIENT_SECRET });

async function getPublicToken() {
    const result = await authenticationClient.authenticate(['viewables:read']);
    return result;
}

async function listModels() {
    const objects = await dataManagementClient.listObjects(FORGE_BUCKET);
    return objects.map(obj => {
        return {
            name: obj.objectKey,
            urn: urnify(obj.objectId)
        };
    });
}

module.exports = {
    getPublicToken,
    listModels
};
