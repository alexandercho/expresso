const assert = require('node:assert/strict');

const {
    assertHealthyBackend
} = require('./api-contract-assertions');

const assertDeprecatedApiCase = async ({
    baseUrl,
    expectedCurrentApiVersion,
    requestJson,
    testCase
}) => {
    await assertHealthyBackend({
        baseUrl,
        expectedApiVersion: expectedCurrentApiVersion,
        requestJson
    });

    const requestOptions = {
        method: testCase.method
    };

    if (testCase.body !== undefined) {
        requestOptions.body = JSON.stringify(testCase.body);
        requestOptions.headers = {
            'Content-Type': 'application/json'
        };
    }

    const { body, response } = await requestJson(baseUrl, testCase.path, requestOptions);

    assert.equal(response.status, testCase.expectedStatus);

    if (testCase.expectedError !== undefined) {
        assert.equal(body?.error, testCase.expectedError);
    }

    if (testCase.replacement !== undefined) {
        assert.equal(body?.replacement, testCase.replacement);
    }
};

module.exports = {
    assertDeprecatedApiCase
};
