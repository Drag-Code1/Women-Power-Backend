const express = require("express");
const router = express.Router();
const ArtistController = require("../controller/artist-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("admin"), (req, res, next) =>
  ArtistController.createArtist(req, res, next)
);
router.get("/", (req, res, next) =>
  ArtistController.getAllArtists(req, res, next)
);
router.get("/:name", (req, res, next) =>
  ArtistController.searchArtists(req, res, next)
);
router.get("/details/:id", (req, res, next) =>
  ArtistController.getArtistDetails(req, res, next)
);
router.post("/filter", (req, res, next) =>
  ArtistController.getArtistFilter(req, res, next)
);
router.put("/:id", auth("admin"), (req, res, next) =>
  ArtistController.updateArtist(req, res, next)
);
router.delete("/:id", auth("admin"), (req, res, next) =>
  ArtistController.deleteArtist(req, res, next)
);

module.exports = router;
