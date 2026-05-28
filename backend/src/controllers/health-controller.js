const { getCurrentApiVersion } = require('#utils/api-version');

const getHealth = (_req, res) =>
    res.json({
        latestSupportedApiVersion: getCurrentApiVersion(),
        service: 'backend',
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Number(process.uptime().toFixed(2))
    });

module.exports = {
    getHealth
};
