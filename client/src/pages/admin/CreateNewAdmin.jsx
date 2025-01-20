import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateNewAdmin = () => {
    const [type,setType] = useState(false)
    const [formValues, setFormValues] = useState({
        email: "",
        mobileNo: "",
        password: "",
        username: "",
        role: "admin",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        mobileNo: "",
        password: "",
        username: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        // Clear error as user types
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        // Validate fields
        if (!formValues.email) errors.email = "Email is required";
        if (!formValues.mobileNo) errors.mobileNo = "Mobile Number is required";
        if (!formValues.password) errors.password = "Password is required";
        if (!formValues.username) errors.username = "Username is required";

        setFormErrors(errors);

        // If no errors, proceed to submit
        if (Object.keys(errors).length === 0) {
       try{
           const data = await axios.post(`/api/v1/user/register`, formValues)
           if (data) {
               console.log(data)
               formValues.email('')
               formValues.mobileNo('')
               formValues.password('')
               formValues.username('')
           }
       }catch(e){
        // console.log('err in creating admin',e)
        toast.error("User Already Exists")
       }        
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Create New Admin</h2>
            <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        placeholder="Enter email"
                    />
                    {formErrors.email && (
                        <span className="text-red-500 text-sm">{formErrors.email}</span>
                    )}
                </div>

                {/* Mobile Number */}
                <div className="mb-4">
                    <label htmlFor="mobileNo" className="block font-medium text-gray-700">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        name="mobileNo"
                        id="mobileNo"
                        value={formValues.mobileNo}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        placeholder="Enter mobile number"
                    />
                    {formErrors.mobileNo && (
                        <span className="text-red-500 text-sm">{formErrors.mobileNo}</span>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type={type ? 'password' : 'text'}
                        name="password"
                        id="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        placeholder="Enter password"
                    />
                    <div className="">
                        <p className="mt-2 px-2 py-2 text-center bg-slate-500 text-white" onClick={(e) => setType(prev => !prev)}>{type ? 'Show' : 'Hide'}</p>
                    </div>
                    {formErrors.password && (
                        <span className="text-red-500 text-sm">{formErrors.password}</span>
                    )}
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formValues.username}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                        placeholder="Enter username"
                    />
                    {formErrors.username && (
                        <span className="text-red-500 text-sm">{formErrors.username}</span>
                    )}
                </div>

                {/* Role */}
                <div className="mb-4">
                    <label htmlFor="role" className="block font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        value={formValues.role}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                    >
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                >
                    Create Admin
                </button>
            </form>
        </div>
    );
};

export default CreateNewAdmin;
