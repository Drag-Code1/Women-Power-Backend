const express = require("express");
const router = express.Router();
const ArtistReviewController = require("../controller/artist-review-controller");

router.post("/", (req, res, next) =>
  ArtistReviewController.createArtistReview(req, res, next)
);
router.get("/:id", (req, res, next) =>
  ArtistReviewController.getArtistReviews(req, res, next)
);
router.put("/:id", (req, res, next) =>
  ArtistReviewController.updateArtistReview(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  ArtistReviewController.deleteArtistReview(req, res, next)
);

module.exports = router;
