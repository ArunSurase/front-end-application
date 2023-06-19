import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {
    const {id} = useParams()
    let navigate = useNavigate()
    const [user, setUser] = useState({
        name: "",
        address: "",
        email: ""
    })
    const { name, address, email } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    useEffect(()=>{
        loadUser()
    },[])
    const onSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`,user)
        navigate('/');
    }
    const loadUser = async ()=>{
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data)
    }
  return (
    <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='Name'>First Name</label>
                            <input className='form-control' type={"text"}
                                placeholder='Enter Your Name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='Address'>Last Name</label>
                            <input className='form-control' type={"text"}
                                placeholder='Enter Your Address'
                                name='address'
                                value={address}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor='Email'>Email Id</label>
                            <input className='form-control' type={"text"}
                                placeholder='Enter Your Email Address'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)} />
                        </div>
                        <button className='btn btn-outline-primary' type='submit'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
  )
}
