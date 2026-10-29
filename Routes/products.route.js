const express = require("express")
const router = express.Router()

console.log(require("../Controllers/products.controller"));

const {createProducts, getAllProduct, getOneProduct, modifierProduct, deleteProduit, getProductByCategorie} = require("../Controllers/products.controller")

router.post("/products", createProducts);
router.get("/products", getAllProduct);
router.get("/products/:id", getOneProduct)
router.put("/products/:id", modifierProduct);
router.delete("/products/:id", deleteProduit)
router.get("/products/category/:category_id", getProductByCategorie)

module.exports = router