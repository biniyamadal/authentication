import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/login', { email, password })
            .then(response => {
                if (response.data.status)
                    navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='w-1/4 md:w-1/4 p-8 border mx-auto justify-center flex items-center shadow-lg mt-8'>
            <form action="" onSubmit={handleSubmit}>
                <h2 className='text-xl mb-5 font-bold text-blue-500 '>Login</h2>
                <button className='w-full border rounded-md border-gray-400 bg-violet-900 hover:bg-violet-950 text-white py-2 mb-4'>Sign in with Google</button>

                <div className='mb-3'>
                    <label htmlFor="email" className='font-medium mb-2 flex'>Email:</label>
                    <input type="email"
                        autoComplete='off'
                        className='w-full border rounded-md bg-zinc-200 border-gray-400 p-3'
                        placeholder='Enter your email'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className='mb-5'>
                    <label htmlFor="password" className='font-medium mb-2 flex'>Password:</label>
                    <input type="password"
                        className='w-full border rounded-md bg-zinc-200 border-gray-400 p-3'
                        placeholder='********'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <button type="submit" className='w-full border rounded-md border-gray-400 bg-violet-900 hover:bg-violet-950 text-white py-2 mb-4'>Login</button>
                <Link to="/forgotpassword" className=' text-blue-500'>Forgot Password?</Link>
                <p>
                    Don't Have an Account?{' '}
                    <Link to="/signup" className="border-blue-500 text-blue-500 px-2 py-1 rounded-md">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
