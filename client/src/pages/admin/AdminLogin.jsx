import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const AdminLogin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const admin = {
        email : 'admin@example.com',
        password : 'password'
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            if(email === admin.email && password === admin.password){
                toast.success("Admin Login Success")
                localStorage.setItem('token',JSON.stringify({
                    isLoggedIn : true,
                    role : 'admin',
                    token : 'blahblah',
                    user : {
                        name : 'Admin',
                        id : 1234567890,
                        role : 'admin'
                    }
                }))
                navigate('/admin/dashboard')
            }
            else{
                toast.error('wrong email or password')
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='bg-[url("../src/assets/admin/adminpagebg.jpg")] bg-cover bg-center w-screen h-screen flex items-center justify-center'>
        <form onSubmit={(e)=>handleSubmit(e)} className="flex gap-6 flex-col p-10 bg-white shadow-2xl">
          <h1 className="text-2xl text-left font-semibold">Sign In</h1>
          <hr />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border focus:border-slate-400 px-2 py-2"
            placeholder="Your Email Address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border focus:border-slate-400 px-2 py-2"
            placeholder="Password"
          />
          <div className="flex gap-4 justify-between items-center">
            <div className="flex items-center justify-center">
              <input type="checkbox" className="mr-1" id="remember"></input>
              <label for="remember" className="text-sm text-slate-600">
                Remember Me
              </label>
            </div>
            <p className="text-sm hover:underline">Forgot Your Password?</p>
          </div>
          <button className="w-full bg-blue-400 hover:bg-blue-600 px-3 py-3 text-white">
            Sign In
          </button>
        </form>
      </div>
  );
}

export default AdminLogin