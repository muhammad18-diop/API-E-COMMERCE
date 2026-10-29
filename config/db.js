const {Pool} = require("pg")

const pool = new Pool({
    host: "localhost",
    database: "postgres",
    user: "postgres",
    password: "Mouhamed",
    port: 5432
})

pool.connect()
.then(() => {
    console.log("Base de donnée connectée avec succés");
    
})
.catch((error) => {
    console.log("Erreur de connexion de la base de donnée", error);
    
})

module.exports = pool