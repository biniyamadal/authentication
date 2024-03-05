import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser } from './UserReducer';
import axios from 'axios';

function Home() {
    // const users = useSelector((state)=>state.users);
    const [users,setUsers]=useState(null)    
    useEffect(()=>{
        axios.get('http://localhost:5000')
        .then(response => {
        console.log("the data is ",response.data)
        setUsers(response.data)
    })
    .catch(err=>{console.log(err)})
    
    },[])
    
    // const dispatch = useDispatch();

    const handledelete = (id) => {

        console.warn('the id isssss ',id)
    // dispatch(deleteUser({id:id}));

    axios.delete('http://localhost:5000/deleteUser/'+id)
    .then(res => {console.log(res)
        window.location.reload()
    })
     .catch(err=>{console.log(err)})

    }




  return (
    <div className="contaner">
        <h1>CRUD App with JSON Server</h1>
        <Link to='/create' className='btn btn-success my-3'>+ Add</Link>
        <table className='table table-hover '>
            <thead className='table-light'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users&& users.map((user,index) =>(
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>

                        <td>
                            <Link to={`/edit/${user._id}`} className='btn btn-sm btn-primary'>Edit</Link>
                            <button onClick={()=> handledelete(user._id)} className='btn btn-sm btn-danger ms-2'>Delete</button>
                        </td>

                    </tr>



                ))}

            </tbody>

        </table>
    </div>
  )
}

export default Home;