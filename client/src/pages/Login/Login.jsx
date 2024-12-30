import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import Header from '../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${ import.meta.env.VITE_BASE_URL }/user/login`,
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Send cookies in requests
        }
      )
      .then(() => navigate('/'))

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='main_login'>
        <div className='loginform'> 
          <h3>Log in</h3>

          <form className='fields' method='POST' onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="email">Email:<span className='mand' dangerouslySetInnerHTML={{ __html: '&ast;' }}></span></label>

            <input placeholder="enter email here" type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='email' />

            <label htmlFor="pass">Password:<span className='mand' dangerouslySetInnerHTML={{ __html: '&ast;' }}></span></label>

            <input placeholder="enter password" minLength={6} autoComplete='current-password' type="password" id='pass' value={password} onChange={(e) => setPassword(e.target.value)} />

            <div className='buttons'>
              <button type='submit'>Submit</button>
              <Link to='/signup' id='linkto'>New User?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
