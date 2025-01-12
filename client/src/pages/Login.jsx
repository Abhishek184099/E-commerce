import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useLogin from '../hooks/useLogin'

export default function Login() {
  
  const {login} = useLogin();

  const [formData, setFormData] = useState({
    email : "",
    password : "",
  })

 const handleSubmit = async(e) => {
  e.preventDefault();
  await login(formData);

 }
  return (
    

    <div className='flex flex-col mx-auto justify-center items-center max-w-96 my-36 '>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' >
        <h1 className='text-3xl font-semibold text-center text-gray-500'>
          Login
       
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Email</span>
            </label>
            <input type='email' placeholder='Enter email' className='w-full input input-bordered h-10'
            value={formData.email} 
            onChange={(e) => setFormData({...formData,email:e.target.value})}
            />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={formData.password} 
              onChange={(e) => setFormData({...formData,password:e.target.value})}
 
            />
          </div>
          <Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2' >
                Login
            </button>
          </div>

        </form>
      </div>
    </div>
    
    
  )
}
