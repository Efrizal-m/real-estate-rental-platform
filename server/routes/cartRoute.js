const express = require("express");
const {
  addToCart,
  editCartItem,
  deleteCartItem,
  getUserCart,
} = require("../controllers/cartController");
const {
    isAuthenticatedUser
} = require("../middlewares/user_actions/auth");
const {
  validateAddToCart,
  validateEditCart,
  validateDeleteCart,
} = require("../middlewares/validator/cartValidator");

const router = express.Router();

router.post("/cart/add", isAuthenticatedUser, validateAddToCart, addToCart);
router.put("/cart/edit", isAuthenticatedUser, validateEditCart, editCartItem);
router.delete("/cart/delete/:cartItemId", isAuthenticatedUser, validateDeleteCart, deleteCartItem);
router.get("/cart", isAuthenticatedUser, getUserCart);

module.exports = router;
