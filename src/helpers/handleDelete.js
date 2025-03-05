import axios from "axios";


export const deleteData = async (endpoint)=>{
    const c = confirm("Are you sure to delete this data?");
    if(c)
    {
        try {
            const response = await axios.delete(endpoint,{credentials:"include"})
        if (!response.statusText === "OK") {
            throw new Error(response.statusText);
        }
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }
    else{
        return false
    }
}