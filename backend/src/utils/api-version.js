const { version } = require('../../package.json');

const getCurrentApiVersion = () => {
    const majorVersion = Number.parseInt(version.split('.')[0] ?? '', 10);

    if (!Number.isInteger(majorVersion) || majorVersion <= 0) {
        return 'v1';
    }

    return `v${majorVersion}`;
};

module.exports = {
    getCurrentApiVersion
};
