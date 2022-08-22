const loggedIn = {
    loggedIn: (req, res, next) => {
        res.locals.loggedIn = false;

        if (req.session.user) res.locals.loggedIn = true;

        next();
    }
}

module.exports = loggedIn;