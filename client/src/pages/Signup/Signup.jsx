import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios';
import Header from '../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        {
          name: username,
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
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='main_signup'>
        <div className='signupform'>
          <h3>Sign up</h3>

          <form className='fields' method='POST' onSubmit={(e) => handleSignup(e)}>
            <label htmlFor="username">Username:<span className='mand' dangerouslySetInnerHTML={{ __html: '&ast;' }}></span></label>

            <input placeholder="enter username here" type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="email">Email:<span className='mand' dangerouslySetInnerHTML={{ __html: '&ast;' }}></span></label>

            <input placeholder="enter email here" type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="pass">Password:<span className='mand' dangerouslySetInnerHTML={{ __html: '&ast;' }}></span></label>

            <input placeholder="minimum length: 6" minLength={6} autoComplete='current-password' type="password" id='pass' value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div className='buttons'>
              <button type='submit'>Submit</button>
              <Link to='/login' id='linkto'>Existing User?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup
