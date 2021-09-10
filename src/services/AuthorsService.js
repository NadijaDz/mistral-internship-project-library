
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

   

   const getAll= async(method)=>{
         return await axios.get(url + method)
    }

    const getById= async(method,id)=>{
        return await axios.get(url+method+'/'+ id)

   }
  

    const addNew= async(method,data)=>{
        return await axios.post(url+method,data)

   }

   const update= async(method,id,data)=>{
    return await axios.put(url+method+'/'+ id,data)

}

export  {getAll,addNew,update,getById}







