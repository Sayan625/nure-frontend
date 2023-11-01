import axios from "axios"
import { apiBase } from "./data"

// get al categories
export const GetCategories= async ()=>{

    try {
        const resp = await axios.get(`${apiBase}/categories`)
        return resp.data
      } catch (error) {
        return []
        
    }

}