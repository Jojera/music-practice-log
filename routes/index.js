const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    // #swagger.tags = ['Hello World']
    res.send("Hello World! Am Jonathan, meet the Music Practice Log API");
});

router.use("/musicLogs", require("./musicLogs"));

module.exports = router;