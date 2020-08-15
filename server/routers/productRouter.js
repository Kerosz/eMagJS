import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const productRouter = express.Router();

productRouter.post(
  '/products',
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      id: req.body.id,
      name: req.body.name,
      category: req.body.category,
      img: req.body.img,
      price: req.body.price,
      onSale: req.body.onSale,
      salePrice: req.body.salePrice,
      stock: req.body.stock,
    });

    const createdProduct = await product.save();

    if (!createdProduct) {
      res.status(401).send({
        message: 'Invalid product data',
      });
    } else {
      res.send({
        _id: createdProduct._id,
        id: createdProduct.id,
        name: createdProduct.name,
        category: createdProduct.category,
        img: createdProduct.img,
        price: createdProduct.price,
        onSale: createdProduct.onSale,
        salePrice: createdProduct.salePrice,
        stock: createdProduct.stock,
      });
    }
  })
);
