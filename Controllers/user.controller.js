const users = require("../Models/user.model")
const bcypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
   try {
     const {nom, email, password} = req.body

    if(!nom || !email || !password){
      return  res.status(400).json({message: "Les champs sont obligatoires"})
        
    }

    const userExite = await users.findByEmail(email)

    if(userExite){
      return  res.status(409).json({message: "Ce utilisateur existe déja"})
        
    }

    const passwordHasher = await bcypt.hash(password, 10)

    const user = await users.register(nom, email, passwordHasher)

    res.status(201).json({message: "Utilisateur crée avec succés", utilisateur: user})
   } catch (error) {
    console.error(error.message);
    res.status(500).json({message: "Erreur serveur"})
    
   }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password){
           return  res.status(400).json({message: "Les champs sont obligatoires"})
           
        }

        const userExite = await users.findByEmail(email)

        if(!userExite){
          return  res.status(401).json({message: "Email ou mot de passe incorrect"})
            
        }

        const mdv = await bcypt.compare(password, userExite.password)

        if(!mdv){
            return res.status(400).json({message: "Email ou mot de passe incorrect"})
        }
        const token = jwt.sign(
            {
                id: userExite.id,
                email: userExite.email,
                role: userExite.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "5h"
            }
        )
        
        res.status(200).json({message: "Connexion réussi", token})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur serveur"})
    }
}

module.exports = {register, login}