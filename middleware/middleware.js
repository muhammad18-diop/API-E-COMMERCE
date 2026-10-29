const jwt = require("jsonwebtoken")

const authmiddleware = async(req, resizeBy, next) => {
    try {
        const authHeader = req.headers.authorization

        const parts = authHeader.split(" ")

        if(parts.length !== 2 || parts[0] !== "Bearer"){
            return res.status(400).json({message: "Format du token invalide"})
        }

        const token = parts[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Erreur du serveur"})
        
    }
}

module.exports = {authmiddleware}