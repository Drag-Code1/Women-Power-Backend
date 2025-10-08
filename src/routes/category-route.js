const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/category-controller");
const auth = require("../middleware/auth-middleware");

router.post("/", auth("admin"), (req, res, next) =>
  CategoryController.createCategory(req, res, next)
);
router.get("/", (req, res, next) =>
  CategoryController.getAllCategories(req, res, next)
);
router.put("/:id", auth("admin"), (req, res, next) =>
  CategoryController.updateCategory(req, res, next)
);
router.delete("/:id", auth("admin"), (req, res, next) =>
  CategoryController.deleteCategory(req, res, next)
);
router.get("/:id", (req, res, next) =>
  CategoryController.getCategoryById(req, res, next)
);

module.exports = router;
