const { spawnSync } = require('node:child_process');

const readVersion = (scriptPath) => {
    const result = spawnSync(process.execPath, [scriptPath], {
        encoding: 'utf8'
    });

    if (result.status !== 0) {
        throw new Error(result.stderr || `Failed to read version with ${scriptPath}.`);
    }

    return result.stdout.trim();
};

const backendApiVersion = readVersion('scripts/ci/get-backend-api-version.js');
const frontendApiVersion = readVersion('scripts/ci/get-frontend-api-version.js');

if (backendApiVersion !== frontendApiVersion) {
    throw new Error(
        `Frontend minimum supported API version ${frontendApiVersion} does not match backend API version ${backendApiVersion}.`
    );
}

process.stdout.write(`Matched API version ${backendApiVersion}\n`);
