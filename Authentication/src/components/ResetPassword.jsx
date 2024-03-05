import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const {token} = useParams()

  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3000/resetpassword/'+token, { password })
      .then(response => {
        if (response.data.status) {
          navigate('/login');
        } 
        console.log(response.data)
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-11/12 md:w-1/2 lg:w-1/4 p-8 border justify-center flex flex-col items-center shadow-lg mt-8'>
        <form onSubmit={handleSubmit} className='w-full'>
          <h2 className='text-xl mb-5 font-bold'>Reset Password</h2>

          <div className='mb-3'>
          <label htmlFor="password" className='font-medium mb-2 flex'>New Password:</label>
          <input
            type="password"
            className='w-full border rounded-md bg-zinc-200 border-gray-400 p-3'
            placeholder='********'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

          <button type="submit" className='w-full border rounded-md border-gray-400 bg-violet-900 hover:bg-violet-950 text-white py-2 mb-4'>Reset</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
