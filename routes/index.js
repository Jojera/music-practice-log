const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    // #swagger.tags = ['Hello World']
    res.send("Hello World! Am Jonathan, meet the Music Practice Log API. Checkout the documentation at '/api-docs'");
});

router.use("/musicLogs", require("./musicLogs"));
router.use("/musicians", require("./musicians"));

module.exports = router;