const express = require("express");
const router = express.Router();
const EventController = require("../controller/event-controller");

router.post("/", (req, res, next) =>
  EventController.createEvent(req, res, next)
);
router.get("/", (req, res, next) =>
  EventController.getAllEvents(req, res, next)
);
router.put("/:id", (req, res, next) =>
  EventController.updateEvent(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  EventController.deleteEvent(req, res, next)
);
router.get("/:id", (req, res, next) =>
  EventController.getEventById(req, res, next)
);

module.exports = router;
