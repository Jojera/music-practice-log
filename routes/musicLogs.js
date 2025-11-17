const router = require("express").Router();
const musicLogsController = require("../controllers/musicLogs");
const validation = require("../middleware/validation");

router.get("/", musicLogsController.getAllMusicLogs);
router.get("/:id", musicLogsController.getMusicLogById);
router.post("/", validation.saveMusicLog, musicLogsController.createMusicLog);
router.put("/:id", validation.saveMusicLog, musicLogsController.updateMusicLog);
router.delete("/:id", musicLogsController.deleteMusicLog);

module.exports = router;
