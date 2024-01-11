require("dotenv").config();
const express = require('express');
const app = express();
require("./db/conn")
const cors = require('cors');
const router = require("./routers/router")
const PORT = process.env.PORT || "5002"
 


app.use(cors());
app.use(express.json()); 
app.use(router);

app.get("/", (req, res)=> {
    res.status(200).json("Server Start");
})

app.listen(PORT, ()=> {
    console.log("Server Started");
}) 

   

// api main path 
// https://gojo-backend-apis.onrender.com/