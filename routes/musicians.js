const router = require("express").Router();
const musiciansController = require("../controllers/musicians");
const validation = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", musiciansController.getAllMusicians);
router.get("/:id", musiciansController.getMusicianById);
router.post("/", isAuthenticated, validation.saveMusician, musiciansController.createMusician);
router.put("/:id", isAuthenticated, validation.saveMusician, musiciansController.updateMusician);
router.delete("/:id", isAuthenticated, musiciansController.deleteMusician);

module.exports = router;