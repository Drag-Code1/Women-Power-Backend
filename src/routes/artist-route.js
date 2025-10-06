const express = require("express");
const router = express.Router();
const ArtistController = require("../controller/artist-controller");

router.post("/", (req, res, next) =>
  ArtistController.createArtist(req, res, next)
);
router.get("/", (req, res, next) =>
  ArtistController.getAllArtists(req, res, next)
);
router.get("/:name", (req, res, next) =>
  ArtistController.searchArtists(req, res, next)
);
router.get("/filter", (req, res, next) =>
  ArtistController.getArtistFilter(req, res, next)
);
router.put("/:id", (req, res, next) =>
  ArtistController.updateArtist(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  ArtistController.deleteArtist(req, res, next)
);

module.exports = router;
