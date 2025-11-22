const router = require("express").Router();
const musicLogsController = require("../controllers/musicLogs");
const validation = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", musicLogsController.getAllMusicLogs);
router.get("/:id", musicLogsController.getMusicLogById);
router.post("/", isAuthenticated, validation.saveMusicLog, musicLogsController.createMusicLog);
router.put("/:id", isAuthenticated, validation.saveMusicLog, musicLogsController.updateMusicLog);
router.delete("/:id", isAuthenticated, musicLogsController.deleteMusicLog);

module.exports = router;
