
import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

   

   const getAll= async(method)=>{
         return await axios.get(url + method)
    }

    
   const getBySearchAndPagination= async(method,data,skip,take)=>{
    return await axios.get(url + method , {
       params: {
         name: data,
         skip:skip,
         take:take
       }
     })

}
  
  

    const addNew= async(method,data)=>{
        return await axios.post(url+method,data)

   }


export  {getAll,addNew,getBySearchAndPagination}







