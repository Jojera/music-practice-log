const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));
router.use("/musicLogs", require("./musicLogs"));
router.use("/musicians", require("./musicians"));

router.get("/login", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

module.exports = router;