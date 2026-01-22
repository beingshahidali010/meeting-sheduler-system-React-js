import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    const [user, setUser] = useState({
        Name: '',
        email: '',
        status: '',
        password: "",
    });
    function changeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user, [name]:value})
    }
    const navigate = useNavigate();
    async function submitHandler(e) {
      e.preventDefault();
      try {
          const res = await axios.post('http://localhost:8000/login', user)
            localStorage.setItem('userId', res.data._id)
            localStorage.setItem('userEmail', res.data.email)
            toast.success('User Logged Successfully')
            navigate('/')
        } catch (error) {
            // toast.error(error.data.msg)
            toast.error(error.response.data.msg)
        }
    }
  return (
    <div className="w-50 mx-auto my-4">
      <h2>Login Here</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="John@gmail.com"
            name="email"
            value={user.email}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="******"
            name="password"
            value={user.password}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Login
        </Button>
        <p>
          Don't have an account, Register Here? <Link to="/register">Register</Link>
        </p>
      </Form>
    </div>
  )
}

export default Login
