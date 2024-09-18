import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Products from './Products';
import Banner from './Banner';
import { auth, db } from '../Firebaseconfigs/Firebaseconfigs';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Home = () =>  {
    function GetCurrentUser() {
        const [user, setUser] = useState(null);
        const usersCollectionRef = collection(db, "users"); // Assuming the correct collection is "users"

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    const getUsers = async () => {
                        const q = query(usersCollectionRef, where("uid", "==", userlogged.uid)); // Correct operator
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

    return (
        <div>
            <Navbar />
            <Products />
            <Banner />
            {/* Check if loggeduser exists and has data */}
            <p>{loggeduser && loggeduser.length > 0 ? loggeduser[0].email : "No data"}</p>
        </div>
    );
}

export default Home;
