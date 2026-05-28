const app = require('#app');

const startApiTestServer = async () =>
    new Promise((resolve, reject) => {
        const server = app.listen(0, () => {
            const { port } = server.address();

            resolve({
                baseUrl: `http://127.0.0.1:${port}`,
                close: async () =>
                    new Promise((closeResolve, closeReject) => {
                        server.close((error) => {
                            if (error) {
                                closeReject(error);
                                return;
                            }

                            closeResolve();
                        });
                    })
            });
        });

        server.on('error', reject);
    });

const requestJson = async (baseUrl, path, options = {}) => {
    const response = await fetch(`${baseUrl}${path}`, options);
    const data = await response.json().catch(() => null);

    return {
        body: data,
        response
    };
};

module.exports = {
    requestJson,
    startApiTestServer
};
