const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const { Rewind } = require("lucide-react");
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.get(`api/movie`,async(req,res)=>{
    try{
        const response = "https://api.themoviedb.org/3/search/movie?api_key=6c420884d135e913472960df62122413&query=incep&language=en-US&page=3";
        res.json(response);
    }
    catch(err){
        console.error(err);
    }
})
app.listen(PORT,()=>{
    console.log(`Server running on port:`,PORT)
})

