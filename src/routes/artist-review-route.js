const express = require("express");
const router = express.Router();
const ArtistReviewController = require("../controller/artist-review-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("user"), (req, res, next) =>
  ArtistReviewController.createArtistReview(req, res, next)
);
router.get("/:id", auth(), (req, res, next) =>
  ArtistReviewController.getArtistReviews(req, res, next)
);
router.put("/:id", auth("user"), (req, res, next) =>
  ArtistReviewController.updateArtistReview(req, res, next)
);
router.delete("/:id", auth("user"), (req, res, next) =>
  ArtistReviewController.deleteArtistReview(req, res, next)
);

module.exports = router;
