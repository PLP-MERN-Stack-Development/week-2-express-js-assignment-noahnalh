const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.route("/").get(getProducts).post(auth, validate, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(auth, validate, updateProduct)
  .delete(auth, deleteProduct);

module.exports = router;
