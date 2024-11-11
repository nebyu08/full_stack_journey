import axios from "axios";
//import { config } from "dotenv";
//config();

//const api_key=import.meta.env.api_key

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'35698ee89ec845579484724005b531eb'
    }
})