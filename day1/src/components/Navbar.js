import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import cart from '../components/Assets/cart.png'
import profile from '../components/Assets/profile.png'
const Navbar = () => {
  return (
    <nav>
      <Link to='/' className='nav-link'>
        <button className='nav-button'>Home</button>
      </Link>
      <Link to='/signup' className='nav-link'>
        <button className='nav-button'>Sign Up</button>
      </Link>
      <Link to='/login' className='nav-link'>
        <button className='nav-button'>Login</button>
      </Link>
      <Link to ='/cart'>
        <div className='cart-logo'>
        <img src={cart} alt = "no img"/>
        <span className='cart-icon-css'>0</span>
        </div>
      </Link>
      <Link to = "userprofile">
        <img src={profile} className='profile-icon'/>
      </Link>
    </nav>
  );
}

export default Navbar;
