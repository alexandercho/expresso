const test = require('node:test');
const { startApiTestServer, requestJson } = require('./helpers/api-test-server');
const {
    assertHealthyBackend,
    assertResourceCrudContract
} = require('./helpers/api-contract-assertions');
const { getCurrentApiVersion } = require('#utils/api-version');

const currentApiVersion = getCurrentApiVersion();
const latestResourcePath = `/api/${currentApiVersion}/resource`;

test('latest API health requests should work', async (t) => {
    const server = await startApiTestServer();

    t.after(async () => {
        await server.close();
    });

    await assertHealthyBackend({
        baseUrl: server.baseUrl,
        expectedApiVersion: currentApiVersion,
        requestJson
    });
});

test('latest API resource requests should work', async (t) => {
    const server = await startApiTestServer();

    t.after(async () => {
        await server.close();
    });

    await assertResourceCrudContract({
        baseUrl: server.baseUrl,
        payloadPrefix: 'latest-resource',
        requestJson,
        resourcePath: latestResourcePath
    });
});
