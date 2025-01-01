import axios from 'axios'
import React, { useEffect } from 'react'

const DisplayRegisterUser = () => {
    const getAllUsers = async () => {
        try{
            const data = await axios.post('/api/v1/user')
            if(data){
                console.log(data)
            }
        }catch(e){
            console.log("Error in getting users",e)
        }
    }
    useEffect(()=>{
        getAllUsers();
    },[])
  return (
    <div>
        <h1 className="text-center">Hi</h1>
    </div>
  )
}

export default DisplayRegisterUser