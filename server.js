require("dotenv").config();
const express = require("express")
const app = express();
const pool = require("./config/db")
const userRoute = require("./Routes/user.route")
const productRoutes = require("./Routes/products.route")
const categoriesRoutes = require("./Routes/categorie.route")

const PORT = process.env.PORT

app.use(express.json());

app.get("/", (req, res) =>  {
    res.send("SERVEUR FONCTIONNE")
})

app.use("/api", userRoute);
app.use("/api", productRoutes)
app.use("/api", categoriesRoutes)


app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
    
})
