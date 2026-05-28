const express = require('express');

const {
    deleteResource,
    getResource,
    postResource,
    putResource
} = require('#controllers/crud-controller');
const {
    getHealth
} = require('#controllers/health-controller');
const requestMiddleware = require('#middleware/request-middleware');

const router = express.Router();

router.use(requestMiddleware);

router.get('/health', getHealth);

router.route('/api/v1/resource')
    .get(getResource)
    .post(postResource)
    .put(putResource)
    .delete(deleteResource);

module.exports = router;
