const deprecatedCasesByVersion = {
    // Example future shape:
    // v1: [
    //     {
    //         expectedError: 'Deprecated API request.',
    //         expectedStatus: 410,
    //         method: 'GET',
    //         path: '/api/v1/old-resource',
    //         replacement: '/api/v2/resource'
    //     }
    // ]
};

const getDeprecatedApiCases = () =>
    Object.entries(deprecatedCasesByVersion).flatMap(([version, cases]) =>
        cases.map((testCase) => ({
            ...testCase,
            version
        }))
    );

module.exports = {
    deprecatedCasesByVersion,
    getDeprecatedApiCases
};
