function notFoundHandler(req, res) {
    return res.status(404).send(`<h3>Page Not Found</h3>`);
}

export default notFoundHandler;