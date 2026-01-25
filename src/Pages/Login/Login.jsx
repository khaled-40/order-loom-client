import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';


const Login = () => {
    const { signInWithGoogle, signInUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    // console.log(location.state)
    const navigate = useNavigate();
    // console.log('from register',location)
    const handleRegistration = (data) => {
        console.log(data)

        signInUser(data.email, data.password)
            .then(result => {
                console.log(result)
                navigate(location?.state || '/');
                toast.success("Logged In successfully", {
                    style: {
                        background: "linear-gradient(to right, #065F46, #334155)",
                        color: "#fff",
                    },
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <form className='px-12' onSubmit={handleSubmit(handleRegistration)}>
                <h2 className='text-4xl font-bold pb-2'>Login With An Account</h2>
                <p>Login with OrderLoom</p>
                <fieldset className="fieldset">


                    <label className="label">Email</label>
                    <input type="email" {...register('email', {
                        required: true
                    })}
                        className="input w-full" placeholder="Email" />
                    {errors.email?.type === 'required' && <p className='text-red-700'>Email is required</p>}

                    <div className='relative'>
                        <label className="label">Password</label>
                        <input type={showPassword ? "text" : "password"} {...register('password', {
                            required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/
                        })}
                            className="input w-full" placeholder="Password" />
                        <button
                            type="button"
                            className="absolute  right-3 top-1/2  text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password?.type === "required" && <p className='text-red-700'>Password is required</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-700'>Password must contain at least 6 characters</p>}
                    {errors.password?.type === "pattern" && <p className='text-red-700'>Password must contain at least one upper case and one lower case</p>}

                    <button className="btn btn-primary text-white mt-4">Login</button>
                </fieldset>
            </form>
            <p className='px-12'>Already have an account? <Link className='text-primary' to={'/auth/register'}>Register</Link></p>
            <p className='text-center text-gray-400'>Or</p>
            <button onClick={handleGoogleSignIn} className="btn w-full mx-12 bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default Login;