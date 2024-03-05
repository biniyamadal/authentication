import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)

    axios.post('http://localhost:3000/forgotpassword', { email })
      .then(response => {
        setLoading(true)
      
        if (response.data.status) {
          alert("Check your email for the reset password link");
          setEmail("")
          navigate('/login');
        } else {
          setError("Email not found. Please enter a valid email.");
        }
       
      })
      .catch(err => {
        setError("An error occurred. Please try again later.");
        console.error(err);
      });
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-11/12 md:w-1/2 lg:w-1/4 p-8 border justify-center flex flex-col items-center shadow-lg mt-8'>
        <form onSubmit={handleSubmit} className='w-full'>
          <h2 className='text-xl mb-5 font-bold'>Forgot Password</h2>

          <div className='mb-3 w-full'>
            <label htmlFor="email" className='font-medium mb-2'>Email:</label>
            <input
              type="email"
              autoComplete='off'
              className='w-full border rounded-md bg-zinc-200 border-gray-400 p-3'
              placeholder='Enter your email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
           {loading && <p>Loading...</p> }
          </div>

          {error && <div className="text-red-500 mb-3">{error}</div>}

          <button type="submit" className='w-full border rounded-md border-gray-400 bg-violet-900 hover:bg-violet-950 text-white py-2 mb-4'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
