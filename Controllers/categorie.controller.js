const categories = require("../Models/categorie.model")

const createCategorie = async (req, res) => {
    try {
        const {nom} = req.body

        if(!nom){
            return res.status(400).json({message: "Le champ nom est obligatoires"})
        }

        const result = await categories.createCategorie(nom)

        res.status(201).json({message: "Categorie enregistré avec succés", Categorie: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
        
    }
}

const getAllCategorie = async (req, res) => {
    try {

        const result = await categories.getAllCategorie();

        res.status(200).json({message: "Les Categories", Categorie: result })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
        
    }
}

const getOneCategorie = async (req, res) => {
    try {
        const {id} = req.params

        const result = await categories.getOnecategorie(id);
        if(!result){
            return res.status(404).json({message: "La catégorie n'est pas touvé"})
        }
        res.status(200).json({message: "La categorie est", Categorie: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur serveur"})
    }
}

const updateCategorie = async (req, res) =>{
    try {
        const {nom} = req.body
        const {id} = req.params

        if(!nom){
            return res.status(400).json({message: "Le champs est obligatoires"})
        }

        const result = await categories.updateCategorie(nom, id)

        if(!result){
            return res.status(404).json({message: "La catégorie est introuvable"})
        }

        res.status(200).json({message: "Catégorie Modifier avec succés", Categorie: result})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

const deleteCategorie = async (req, res) => {
    try {
        const {id} = req.params

    const result = await categories.deleteCategorie(id)

    if(!result){
        return res.status(404).json({message: "Categorie introuvable"})
    }

    res.status(200).json({message: "Categorie Supprimé avec succés"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur Serveur"})
    }
}

module.exports = {createCategorie, getAllCategorie, getOneCategorie, updateCategorie, deleteCategorie}