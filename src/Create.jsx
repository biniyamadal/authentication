import React, { useState } from 'react';
import { addUser } from './UserReducer'; // Import addUser along with the rest of the slice
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // const users = useSelector((state) => state.users);
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // dispatch(addUser({ id: users[users.length - 1].id + 1, name, email }));
        navigate('/');
        
        axios.post('http://localhost:5000/createUser', {name,email})
        .then(result=>{
            console.log(result)  
        })
        .catch(err=>console.log(err))
    }

    // const update= async ()=>{
    //     console.log('this is update ')
    //   await  axios.post('http://localhost:5000/createUser', {name,email})

    // }
    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <h3>Add New Users</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <small id="emailHelp" className="form-text text-warning">We'll never share your email with anyone else.</small>
                    </div>
                    <button type="submit" className="btn btn-info">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;
