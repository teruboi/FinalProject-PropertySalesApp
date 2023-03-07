function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401).redirect('/login');
}

module.export = isLoggedIn