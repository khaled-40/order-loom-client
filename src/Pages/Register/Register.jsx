import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const Register = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    // console.log(location.state)
    const navigate = useNavigate();
    // console.log('from register',location)
    const handleRegistration = async (data) => {
        setLoading(true);
        try {
            console.log(data);

            const profileImg = data.photo[0];
            const role = data.role;

            // 1. Create user (Firebase)
            const result = await createUser(data.email, data.password);

            // 2. Upload image
            const formData = new FormData();
            formData.append('image', profileImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

            const imageRes = await axios.post(image_API_URL, formData);
            const photoURL = imageRes.data.data.url;

            // 3. Save user in DB
            const userInfo = {
                name: data.name,
                email: result.user.email,
                role: role,
                photoURL: photoURL
            };

            await useAxiosSecure.post('/users', userInfo);

            // 4. Update profile
            await updateUserProfile({
                displayName: data.name,
                photoURL: photoURL
            });

            // 5. Success UI
            toast.success("Account created successfully", {
                style: {
                    background: "linear-gradient(to right, #065F46, #334155)",
                    color: "#fff",
                },
            });

            navigate(location?.state || '/');

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.response?.data?.message || error.message || "Something went wrong"
            });
        } finally {
            setLoading(false)
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoginLoading(true);
        try {
            const result = await signInWithGoogle();

            const userInfo = {
                name: result.user.displayName || "No Name",
                email: result.user.email,
                role: 'buyer',
                photoURL: result.user.photoURL || ""
            };

            const res = await useAxiosSecure.post('/users', userInfo);

            // ✅ Verify before showing success
            if (res.data?.insertedId) {
                toast.success("Account created successfully", {
                    style: {
                        background: "linear-gradient(to right, #065F46, #334155)",
                        color: "#fff",
                    },
                });
            } else {
                toast.success("Welcome Back", {
                    style: {
                        background: "linear-gradient(to right, #065F46, #334155)",
                        color: "#fff",
                    },
                });
            }

            navigate(location?.state || '/');

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.response?.data?.message || error.message || "Something went wrong"
            });
        } finally {
            setGoogleLoginLoading(false);
        }
    };
    return (
        <div>
            <form className='px-12' onSubmit={handleSubmit(handleRegistration)}>
                <h2 className='text-4xl font-bold pb-2'>Create An Account</h2>
                <p>Register with Order Loom</p>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" {...register('name', {
                        required: true
                    })}
                        className="input w-full" placeholder="Name" />
                    {errors.name?.type === 'required' && <p className='text-red-700'>Name is required</p>}

                    <label className="label">Photo</label>
                    <input type="file" className="file-input w-full" {...register('photo', {
                        required: true
                    })} />
                    {errors.photo?.type === 'required' && <p className='text-red-700'>Photo is required</p>}

                    {/* Role Select */}
                    <label className="form-control w-full">
                        <span className="label-text mb-1">Role</span>
                        <select
                            className="select select-bordered w-full"
                            {...register("role", { required: true })}
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select role
                            </option>
                            <option value="buyer">Buyer</option>
                            <option value="manager">Manager</option>
                        </select>
                    </label>
                    {errors.role?.type === "required" && <p className='text-red-700'>Role is required</p>}

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

                    <button className="btn btn-primary text-white mt-4">{loading ? <span class="loading loading-spinner text-neutral"></span> : 'Register'}</button>
                </fieldset>
            </form>
            <p className='px-12'>Already have an account? <Link className='text-primary' to={'/auth/login'}>LogIn</Link></p>
            <p className='text-center text-gray-400'>Or</p>
            <button onClick={handleGoogleSignIn} className="btn w-full mx-12 bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                {googleLoginLoading ? <span class="loading loading-spinner text-neutral"></span> : 'Login with Google'}
            </button>
        </div>
    );
};

export default Register;