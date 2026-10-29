const products = require("../Models/product.model")

const createProducts = async (req, res) => {
    try {
        const {nom, prix, stock, category_id} = req.body

    if(!nom || !prix || !stock || !category_id){
        return res.status(400).json({message: "Tous les champs sont obligatoires"})
    }

    const result = await products.createProduct(nom, prix, stock, category_id)

    res.status(201).json({message: "Produits enregistrer avec succés", Produits: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
        
    }
}

const getAllProduct = async (req, res) => {
    try {
        const result = await products.getAllProduct();
        res.status(200).json({message: "Tous les produits", Produits: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

const getOneProduct = async  (req, res) => {
    try {
        const {id} = req.params
        const result = await products.getOneProduct(id);
        if(!result){
          return  res.status(404).json({message: "Le produit n'existe pas"})
        }
        res.status(200).json({message: "Voir le produit", Produit: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

const modifierProduct = async (req, res) => {
    try {
        const {nom, prix, stock, category_id} = req.body
        const {id} = req.params

        if(!nom || !prix || !stock || !category_id){
            return res.status(400).json({message: "Les champs sont obligatoires"})
        }

        const result = await products.modifierProduct(nom, prix, stock, category_id, id)

        if(!result){
           return res.status(404).json({message: "Le produit n'existe pas"})
        }

        res.status(200).json({message: "Produit modifier avec succés", Produit: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

const deleteProduit = async (req, res) => {
    try {
        const {id} = req.params

        const result = await products.deleteProducts(id)

        if(!result){
          return  res.status(404).json({message: "Le produit n'existe pas"})
        }

        res.status(200).json({message: "Produit Supprimmé avec succés"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

const getProductByCategorie = async (req, res) => {
    try {
        const {category_id} = req.params

        const result = await products.getProductsByCategorie(category_id)

        if(!result){
            return res.status(404).json({message: "Les produits de ce catégorie n'existe pas"})
        }

        res.status(200).json({message: "Les produits de ce catégorie sont", Produit: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

module.exports = {createProducts, getAllProduct, getOneProduct, modifierProduct, deleteProduit, getProductByCategorie}