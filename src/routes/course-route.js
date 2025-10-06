const express = require("express");
const router = express.Router();
const CourseController = require("../controller/course-controller");

router.post("/", (req, res, next) =>
  CourseController.createCourse(req, res, next)
);
router.get("/", (req, res, next) =>
  CourseController.getAllCourses(req, res, next)
);
router.put("/:id", (req, res, next) =>
  CourseController.updateCourse(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  CourseController.deleteCourse(req, res, next)
);
router.get("/:id", (req, res, next) =>
  CourseController.getCourseById(req, res, next)
);

module.exports = router;
