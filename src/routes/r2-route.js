const express = require("express");
const router = express.Router();
const r2Controller = require("../controller/r2Controller");

router.post("/generate-upload-url", r2Controller.generateUploadUrl);
router.get("/generate-access-url", r2Controller.generateAccessUrl);
router.delete("/delete-image", r2Controller.deleteImage);

module.exports = router;
