const express = require("express")
const router = express.Router()

const {createCategorie, getAllCategorie, getOneCategorie, updateCategorie, deleteCategorie} = require("../Controllers/categorie.controller")

router.post("/categories", createCategorie)
router.get("/categories", getAllCategorie)
router.get("/categories/:id", getOneCategorie)
router.put("/categories/:id", updateCategorie)
router.delete("/categories/:id", deleteCategorie)

module.exports = router