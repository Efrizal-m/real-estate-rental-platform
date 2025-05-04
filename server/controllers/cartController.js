const Product = require("../models/productModel"); // must be loaded before populate("product")
const Cart = require('../models/Cart');

const asyncHandler = require("../middlewares/helpers/asyncHandler");

exports.addToCart = asyncHandler(async (req, res, next) => {   
  try {    
      const { product, quantity = 1, productAttributes } = req.body;
      const userId = req.user._id;
    
      let cartItem = await Cart.findOne({
        user: userId,
        product,
        productAttributes,
        isDeleted: null,
      });
    
      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        cartItem = await Cart.create({
          user: userId,
          product,
          quantity,
          productAttributes,
        });
      }
    
      res.status(200).json({ success: true, cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error });    
  }
});

exports.editCartItem = asyncHandler(async (req, res, next) => {
  try {
    
      const { cartItemId, quantity } = req.body;
      const userId = req.user._id;
    
      const cartItem = await Cart.findOne({
        _id: cartItemId,
        user: userId,
        isDeleted: null,
      });
    
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
    
      cartItem.quantity = quantity;
      await cartItem.save();
    
      res.status(200).json({ success: true, cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error });    
  }
});

exports.deleteCartItem = asyncHandler(async (req, res, next) => {
  try {
    
      const { cartItemId } = req.params;
      const userId = req.user._id;
    
      const cartItem = await Cart.findOne({
        _id: cartItemId,
        user: userId,
        isDeleted: null,
      });
    
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
    
      cartItem.isDeleted = new Date();
      await cartItem.save();
    
      res.status(200).json({ success: true, message: "Cart item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error });        
  }
});

exports.getUserCart = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user._id;
        
        // Step 1: Get all cart items
        const cartItems = await Cart.find({ user: userId, isDeleted: null }).sort({ createdAt: -1 });
    
        // Step 2: Fetch product details manually
        const enrichedCartItems = await Promise.all(
        cartItems.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
            ...item.toObject(),
            product
            };
        })
        );
    
        res.status(200).json({ success: true, cartItems: enrichedCartItems });        
  } catch (error) {
    res.status(500).json({ success: false, error: error });        
  }
});

