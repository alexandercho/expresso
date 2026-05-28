const errorHandlerMiddleware = (error, req, res, _next) => {
    if (error.type === 'entity.too.large') {
        return res.status(413).json({ error: 'Request body is too large.' });
    }

    if (error instanceof SyntaxError && 'body' in error) {
        return res.status(400).json({ error: 'Request body must contain valid JSON.' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error.' });
};

module.exports = errorHandlerMiddleware;
