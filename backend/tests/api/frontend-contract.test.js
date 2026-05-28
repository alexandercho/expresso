const test = require('node:test');
const { startApiTestServer, requestJson } = require('./helpers/api-test-server');
const {
    assertHealthyBackend,
    assertResourceCrudContract
} = require('./helpers/api-contract-assertions');
const { getFrontendApiVersion } = require('./helpers/frontend-api-version');

const frontendApiVersion = getFrontendApiVersion();
const frontendResourcePath = `/api/${frontendApiVersion}/resource`;

test('current frontend health request is supported by the backend', async (t) => {
    const server = await startApiTestServer();

    t.after(async () => {
        await server.close();
    });

    await assertHealthyBackend({
        baseUrl: server.baseUrl,
        expectedApiVersion: frontendApiVersion,
        requestJson
    });
});

test('current frontend compatibility check still matches the current API version', async (t) => {
    const server = await startApiTestServer();

    t.after(async () => {
        await server.close();
    });

    await assertHealthyBackend({
        baseUrl: server.baseUrl,
        expectedApiVersion: frontendApiVersion,
        requestJson
    });
});

test('current frontend resource calls are supported by the backend', async (t) => {
    const server = await startApiTestServer();

    t.after(async () => {
        await server.close();
    });

    await assertResourceCrudContract({
        baseUrl: server.baseUrl,
        payloadPrefix: 'frontend-contract',
        requestJson,
        resourcePath: frontendResourcePath
    });
});
