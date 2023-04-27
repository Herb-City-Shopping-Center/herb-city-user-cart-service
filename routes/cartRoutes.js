const express = require("express");
const router = express.Router();
const {
  addCart,
  getCartList,
  removeCartItem,
} = require("../controllers/cartController");
removeCartItem;

router.route("/addCart").post(addCart);
router.route("/getCartList").post(getCartList);
router.route("/removeCartItem").post(removeCartItem);

module.exports = router;
