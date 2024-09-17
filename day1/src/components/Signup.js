import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebaseconfigs/Firebaseconfigs';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear previous error messages
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        addDoc(collection(db, 'users'), {
          username: username,
          email: email,
          phonenumber: phonenumber,
          password: password,
          cart: [], // Assuming empty cart for new users
          address: address,
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(
              'New user added successfully. You will now be automatically redirected to the login page.'
            );
            setUsername('');
            setPhoneNumber('');
            setEmail('');
            setPassword('');
            setAddress('');
            setErrorMsg('');

            setTimeout(() => {
              setSuccessMsg('');
              navigate('/login'); // Lowercase navigate
            }, 4000);
          })
          .catch((error) => {
            setErrorMsg('Error saving user data: ' + error.message);
          });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMsg('Invalid email address.');
            break;
          case 'auth/email-already-in-use':
            setErrorMsg('User already exists.');
            break;
          case 'auth/weak-password':
            setErrorMsg('Password should be at least 6 characters long.');
            break;
          default:
            setErrorMsg(error.message);
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className='signup-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <p>Create Account</p>

          {successMsg && (
            <div className='success-msg'>
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className='error-msg'>
              {errorMsg}
            </div>
          )}

          <label>Your Name</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type='text'
            placeholder='First and last name'
            required
          />

          <label>Mobile Number</label>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phonenumber}
            type='tel'
            placeholder='Mobile Number'
            required
          />

          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='Enter your email'
            required
          />

          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            placeholder='Enter your password'
            required
          />

          <label>Address</label>
          <textarea
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder='Enter your address'
            required
          ></textarea>

          <button type='submit'>Sign up</button>

          <div>
            <span>Already have an account?</span>
            <Link to='/login'>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
