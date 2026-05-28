const store = require('#data/store');

const getResource = (req, res) => res.json(store.getStore());

const postResource = (req, res) => res.json(store.postResource(req.body));

const putResource = (req, res) => res.json(store.putResource(req.body));

const deleteResource = (req, res) => res.json(store.deleteResource(req.body));

module.exports = {
    deleteResource,
    getResource,
    postResource,
    putResource
};
