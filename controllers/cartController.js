const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModal");
const { green } = require("colors");


const addCart = asyncHandler(async (req, res) => {
  const {
    productId,
    productImage,
    productPrice,
    productTitle,
    customerId,
    shopId,
    quantity,
  } = req.body;

  if (
    !productId ||
    !productImage ||
    !productPrice ||
    !productTitle ||
    !customerId ||
    !shopId ||
    !quantity
  ) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }

  const cart = await Cart.create({
    productId,
    productImage,
    productPrice,
    productTitle,
    customerId,
    shopId,
    quantity,
  });

  if (cart) {
    console.log("Added to cart!!!".green.bold);
    res.status(201).json({
      _id: cart._id,
      productId: cart.productId,
      productImage: cart.productImage,
      productPrice: cart.productPrice,
      productTitle: cart.productTitle,
      customerId: cart.customerId,
      shopId: cart.shopId,
      quantity: cart.quantity,
    });
  } else {
    console.log("Failed to adding cart !!!".red.bold);
    res.status(400).json({
      error: "Failed to adding cart !!!",
    });
    throw new error("Failed to adding cart !!!");
  }
});

const getCartList = asyncHandler(async (req, res) => {
  const { customerId } = req.body;

  if (!customerId) {
    res.send(400);
    throw new error("No Customer ID!!!");
  }

  const cartList = await Cart.find({ customerId: { $in: customerId } });

  if (cartList) {
    res.send(cartList);
    console.log(cartList);
  } else {
    console.log("Invalid shopId for fetch product".red.bold);
    res.status(401);
    throw new error("Invalid shopId for fetch product");
  }
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    console.log("Id is null".red.bold);
    res.status(400).json({
      error: "item id is null",
    });
    throw new error("Error while deleting item !!!");
  } else {
    try {
      //find user by id and delete fron database
      const cart = await Cart.findOneAndDelete({ _id: id });

      //send success response message to the frontend
      if (cart) {
        res.status(201).json({
          _id: id,
        });
        console.log("Item deleted".red.bold);
      }
    } catch (error) {
      //send error response message to the frontend
      res.status(400).json({
        error: "Fail to delete item !!!",
      });
      throw new error("Error while deleting item !!!" + error.message);
    }
  }
});

module.exports = {
  addCart,
  getCartList,
  removeCartItem,
};
