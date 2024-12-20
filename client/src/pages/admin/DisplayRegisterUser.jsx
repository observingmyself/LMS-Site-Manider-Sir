import axios from 'axios'
import React, { useEffect } from 'react'

const DisplayRegisterUser = () => {
    const getUser = async () => {
        const data = await axios.post('/api/v1/user')
        if(data){
            console.log(data)
        }
    }
    useEffect(()=>{
        getUser();
    },[])
  return (
    <div>
        <h1 className="text-center">Hi</h1>
    </div>
  )
}

export default DisplayRegisterUser