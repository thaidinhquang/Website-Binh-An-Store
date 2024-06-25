// import  { useState } from 'react'
import Thumbnail from './Thumbnail'

import Joi from 'joi'
import { joiResolver} from '@hookform/resolvers/joi'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const userSchema =  Joi.object({
    userName: Joi.string().required().min(6),
    email: Joi.string().email({  tlds: { allow: false } }).required().min(3),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    address: Joi.string().required().min(0),
    phone: Joi.string().pattern(/^\d+$/).required().min(10),
    role:Joi.string()
})
const Signup = () => {
    // const [checked, setValue] = useState(false);
    // const rememberMe = () => {
    //   setValue(!checked);
    // };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: joiResolver(userSchema),
        defaultValues: {
            userName:"",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            phone:"",
            role:"user"
        }
    })
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async (user) => {
            const res = await axios.post(`http://localhost:3000/register`, user)
            return res.data
        },
        onSuccess: () => {
            toast.success('Registered successfully')
            navigate('/login')
        },
        onError: (error) => {
            toast.error('Failed ' + error.message)

        }
    })
    const onSubmit = (user) => {
        mutation.mutate(user)
    }
  return (
    <div>
    
    <div className="login-page-wrapper w-full py-10">
      <div className="container-x mx-auto">
        <div className="lg:flex items-center relative">
          <div className="lg:w-[572px] w-full h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
            <div className="w-full">

              <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                  Signup
                </h1>
                <div className="shape -mt-6">
                  <svg
                    width="172"
                    height="29"
                    viewBox="0 0 172 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                      stroke="#FFBB38"
                    />
                  </svg>
                </div>
              </div>
              <div className="input-area">
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-item mb-5">
                  <label className='block'>Username</label>
                  <input
                    className='w-full rounded border border-solid border-gray-200 p-1 focus:outline-none focus:ring focus:border-blue-500'
                    placeholder="Username..."
                    type="text"
                    {...register('userName', {required: true})}
                  />
                  {errors?.userName && <p className='text-red-600'>{errors.userName.message}</p>}
                </div>
                <div className="input-item mb-5">
                  <label className='block'>Email</label>
                  <input
                    className='w-full rounded border border-solid border-gray-200 p-1 focus:outline-none focus:ring focus:border-blue-500'
                    placeholder="abc@gmail.com"
                    type="email"
                    {...register('email', {required: true})}
                  />
                  {errors?.email && <p className='text-red-600'>{errors.email.message}</p>}
                </div>
                <div className="input-item mb-5">
                  <label className='block'>Password</label>
                    <input
                        className='w-full rounded border border-solid border-gray-200 p-1 focus:outline-none focus:ring focus:border-blue-500'
                        placeholder="******"
                        name="password"
                        type="password"
                        {...register('password', { required: true })}
                    />
                    {errors?.password && <p className='text-red-600'>{errors.password.message}</p>}
                    </div>
                <div className="input-item mb-5">
                  <label className='block'>Confirm Password</label>
                    <input
                        className='w-full rounded border border-solid border-gray-200 p-1 focus:outline-none focus:ring focus:border-blue-500'
                        placeholder="******"
                        name="confirmPassword"
                        type="password"
                        {...register('confirmPassword', { required: true })}
                    />
                    {errors?.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message}</p>}
                </div>
                <div className="input-item mb-5">
                  <label className='block'>Phone</label>
                  <input
                    className='w-full rounded border border-solid border-gray-200 p-1 focus:outline-none focus:ring focus:border-blue-500'
                    placeholder="+84"
                    type="text"
                    {...register('phone', {required: true})}
                  />
                  {errors?.phone && <p className='text-red-600'>{errors.phone.message}</p>}
                </div>
                <div className="input-item mb-5">
                  <label className='block'>Address</label>
                  <input
                    className='w-full rounded border border-solid border-gray-200 p-1 focus:outline-none focus:ring focus:border-blue-500'
                    placeholder="Country"
                    type="text"
                    {...register('address', {required: true})}
                  />
                  {errors?.address && <p className='text-red-600'>{errors.address.message}</p>}
                </div>
                <input type="hidden" {...register('role')}/>
               
                <div className="signin-area mb-3.5">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                    >
                      Register
                    </button>
                  </div>
                
                </div>
              
              </form>
              </div>

            </div>
          </div>
          <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center ">
            <div
              className="absolute xl:-right-20 -right-[138px]"
              style={{ top: "calc(50% - 258px)" }}
            >
              <Thumbnail />
            </div>
          </div>
        </div>
      </div>
    </div>
  
    </div>
  )
}

export default Signup
