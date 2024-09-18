import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import cart from '../components/Assets/cart.png';
import profile from '../components/Assets/profile.png';
import image from '../components/Assets/image.png';
import { auth, db } from '../Firebaseconfigs/Firebaseconfigs';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Navbar = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(usersCollectionRef, where("uid", "==", userlogged.uid));
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe(); // Clean up on component unmount
    }, []);

    return user;
  }

  const loggeduser = GetCurrentUser();
  const navigate = useNavigate(); // Fixed naming for `navigate`

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login"); // Use `navigate` correctly
    });
  };

  return (
    <div className='Navbar'>
      <div className='LeftContainer'>
        <img src={image} alt="img" />
      </div>
      <div className='RightContainer'>
        {!loggeduser && (
          <nav>
            <Link to='/'>
              <button>Home</button>
            </Link>
            <Link to='/signup'>
              <button>Sign Up</button>
            </Link>
            <Link to='/login'>
              <button>Login</button>
            </Link>
            <div className='cart-btn'>
              <img src={cart} alt="cart" />
              <span className='cart-icon-css'>0</span>
            </div>
            <Link to="/userprofile">
              <img src={profile} className="profile-icon" alt="profile" />
            </Link>
          </nav>
        )}

        {loggeduser && (
          <nav>
            <Link to='/'>
              <button>Home</button>
            </Link>
            <div className='cart-bin'>
              <img src={cart} alt="cart" />
              <span className='cart-icon-css'>{loggeduser[0]?.cart || 0}</span> {/* Safely access cart */}
            </div>
            <Link to="/userprofile">
              <img src={profile} className='profile-icon' alt="profile" />
            </Link>
            <button className='login-btn' onClick={handleLogout}>Logout</button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Navbar;
