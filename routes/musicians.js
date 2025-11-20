const router = require("express").Router();
const musiciansController = require("../controllers/musicians");
const validation = require("../middleware/validation");

router.get("/", musiciansController.getAllMusicians);
router.get("/:id", musiciansController.getMusicianById);
router.post("/", validation.saveMusician, musiciansController.createMusician);
router.put("/:id", validation.saveMusician, musiciansController.updateMusician);
router.delete("/:id", musiciansController.deleteMusician);

module.exports = router;