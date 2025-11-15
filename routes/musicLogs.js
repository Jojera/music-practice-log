const router = require("express").Router();
const musicLogsController = require("../controllers/musicLogs");

router.get("/", musicLogsController.getAllMusicLogs);
router.get("/:id", musicLogsController.getMusicLogById);
router.post("/", musicLogsController.createMusicLog);
router.put("/:id", musicLogsController.updateMusicLog);
router.delete("/:id", musicLogsController.deleteMusicLog);

module.exports = router;
