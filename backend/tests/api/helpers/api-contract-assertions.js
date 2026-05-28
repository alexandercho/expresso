const assert = require('node:assert/strict');

const assertHealthyBackend = async ({ baseUrl, expectedApiVersion, requestJson }) => {
    const { body, response } = await requestJson(baseUrl, '/health');

    assert.equal(response.status, 200);
    assert.equal(body.service, 'backend');
    assert.equal(body.status, 'ok');
    assert.equal(body.latestSupportedApiVersion, expectedApiVersion);

    return body;
};

const assertResourceCrudContract = async ({ baseUrl, requestJson, resourcePath, payloadPrefix }) => {
    const { body: getBody, response: getResponse } = await requestJson(baseUrl, resourcePath);

    assert.equal(getResponse.status, 200);
    assert.deepEqual(getBody, {});

    const methods = ['POST', 'PUT', 'DELETE'];

    for (const method of methods) {
        const { body, response } = await requestJson(baseUrl, resourcePath, {
            body: JSON.stringify({ latestMessage: `${payloadPrefix}-${method.toLowerCase()}` }),
            headers: {
                'Content-Type': 'application/json'
            },
            method
        });

        assert.equal(response.status, 200);
        assert.deepEqual(body, {});
    }
};

module.exports = {
    assertHealthyBackend,
    assertResourceCrudContract
};
