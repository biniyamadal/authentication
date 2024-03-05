import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { updateUser } from './UserReducer';
import axios from 'axios';


function Update() {
    const { id } = useParams();
    // const users = useSelector((state) => state.users);
    // const existingUser = users.find(user => user.id === id);
    const [uname, setName] = useState('');
    const [uemail, setEmail] = useState('');
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     axios.get('http://localhost:5000/getUser/'+id)
    //     .then(result =>{
    //         console.log(result)
    //         setName(result.data.uname)
    //         setEmail(result.data.uemail)
    //     })
    // .catch(err=>console.log(err))
    
    // },[])

    // Populate state with user data once it's loaded
    // useEffect(() => {
    //     if (existingUser) {
    //         setName(existingUser.name);
    //         setEmail(existingUser.email);
    //     }
    // }, []);

    const handleUpdate =async (event) => {
        event.preventDefault();
        navigate('/'); 
console.warn('the id in update ',id)
       const upd=await axios.put('http://localhost:5000/Update/'+id, {uname,uemail})
        .then(result=>{
            console.log("result",result)
        })
        .catch(err=>console.log(err))

        // dispatch(updateUser({
        //     id: id,
        //     name: uname,
        //     email: uemail
        // }));
        // console.warn("upd",('http://localhost:5000/Update/'+id, {uname,uemail}))
      
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <h3>Update Users</h3>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            value={uname}
                            onChange={e => setName(e.target.value)}
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
                            required
                            value={uemail}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-warning">We'll never share your email with anyone else.</small>
                    </div>
                    <button type="submit" className="btn btn-info">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
