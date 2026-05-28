const express = require('express');

const {
    deleteResource,
    getResource,
    postResource,
    putResource,
} = require('#controllers/crud-controller');
const requestMiddleware = require('#middleware/request-middleware');

const router = express.Router();

router.use(requestMiddleware);

router.get('/health', (req, res) =>
    res.json({
        service: 'backend',
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptimeSeconds: Number(process.uptime().toFixed(2)),
    })
);

router.route('/')
    .get(getResource)
    .post(postResource)
    .put(putResource)
    .delete(deleteResource);

module.exports = router;
