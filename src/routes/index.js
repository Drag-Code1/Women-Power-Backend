const express = require("express");

const login_router = require("./login-router");
const user_router = require("./user-route");
const address_router = require("./address-route");
const contact_details_router = require("./contact-details-route");
const category_router = require("./category-route");
const course_router = require("./course-route");
const event_router = require("./event-route");
const artist_router = require("./artist-route");
const artist_review_router = require("./artist-review-route");
const product_router = require("./product-route");
const product_review_router = require("./product-review-route");
const image_router = require("./image-route");
const cart_item_router = require("./cart-item-route");
const order_router = require("./order-route");
const dashboard_router = require("./dashboard-route");
const wishlist_router = require("./wishlist-route");
const r2 = require("./r2-route");
const payment_router = require("./payment-route");

const router = express.Router();

router.use("/login", login_router);
router.use("/user", user_router);
router.use("/address", address_router);
router.use("/contact-details", contact_details_router);
router.use("/category", category_router);
router.use("/course", course_router);
router.use("/event", event_router);
router.use("/artist", artist_router);
router.use("/artist-review", artist_review_router);
router.use("/product", product_router);
router.use("/product-review", product_review_router);
router.use("/banner", image_router);
router.use("/cart", cart_item_router);
router.use("/order", order_router);
router.use("/dashboard", dashboard_router);
router.use("/wishlist", wishlist_router);
router.use("/r2", r2);
router.use("/payment", payment_router);

module.exports = router;
