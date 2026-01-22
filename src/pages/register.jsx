import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

function Register() {
    const [user, setUser] = useState({
        Name: "",
        email: "",
        status: "",
        password: "",
    });
    function changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value});
    }
    const navigate = useNavigate();
    async function submitHandler(e){
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/register", user)
            toast.success('User Registered Successfully')
            navigate('/login')
        } catch (error) {
            toast.error(error.response.data.msg); 
            console.log(error)
        }
    }
  return (
    <div className="w-50 mx-auto my-4">
      <h2>Create Account</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John"
            name="Name"
            value = {user.Name}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="John@gmail.com"
            name="email"
            value = {user.email}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Status in Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g 'Manager', 'Employee'"
            name="status"
            value = {user.status}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="********"
            name="password"
            value = {user.password}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  )
}

export default Register
