const { version } = require('../../backend/package.json');

const majorVersion = Number.parseInt(version.split('.')[0] ?? '', 10);
const apiVersion = Number.isInteger(majorVersion) && majorVersion > 0 ? `v${majorVersion}` : 'v1';

process.stdout.write(apiVersion);
