export async function loadModels() {
    const resp = await fetch('/api/models');
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    const models = await resp.json();
    return models;
}

export async function getAccessToken() {
    const resp = await fetch('/api/auth/token');
    if (!resp.ok) {
        throw new Error(await resp.text());
    }
    const token = await resp.json();
    return token;
}