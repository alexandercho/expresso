const test = require('node:test');
const { getCurrentApiVersion } = require('#utils/api-version');

const { requestJson, startApiTestServer } = require('./helpers/api-test-server');
const { getDeprecatedApiCases } = require('./helpers/deprecated-api-cases');
const { assertDeprecatedApiCase } = require('./helpers/deprecated-api-assertions');

const currentApiVersion = getCurrentApiVersion();
const deprecatedApiCases = getDeprecatedApiCases();

if (deprecatedApiCases.length === 0) {
    test('deprecated API request coverage is intentionally empty until a deprecated version exists', () => {});
}

for (const testCase of deprecatedApiCases) {
    test(
        `deprecated ${testCase.version} ${testCase.method} ${testCase.path} should fail intentionally`,
        async (t) => {
            const server = await startApiTestServer();

            t.after(async () => {
                await server.close();
            });

            await assertDeprecatedApiCase({
                baseUrl: server.baseUrl,
                expectedCurrentApiVersion: currentApiVersion,
                requestJson,
                testCase
            });
        }
    );
}
