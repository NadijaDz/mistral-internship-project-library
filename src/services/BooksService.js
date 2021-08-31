
import axios from "axios";

    const url = process.env.REACT_APP_BASE_URL;

       

       const getAll= async(method)=>{
             return await axios.get(url + method)

            // const request = axios.get(url+'/Books')
            // return request.then(response => response.data)
        }
      

        const addNew= async(method,data)=>{
            return await axios.post(url+method,data)

       }

       const update= async(method,id,data)=>{
        return await axios.put(url+method+'/'+ id,data)

   }

export  {getAll,addNew,update}







