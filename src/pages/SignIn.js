import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import '../styles/SignIn.css';
import Cookies from "universal-cookie";
import { Auth } from "../components/Auth.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
const auth = getAuth();

const cookies = new Cookies();

function SignIn() {
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLogin, setIsLogin] = useState(false); // State to track sign-up/login mode

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-in logic here
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);

        // i added this below
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // Update user profile with full name
            console.log("User signed up:", user);

            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log("User profile updated with full name:", name);
                console.log("User signed up:", user);

                cookies.set("auth-token", user.refreshToken);
                setIsAuth(true);
            });
            
            // userCredential.user.updateProfile({
            //     displayName: name
            // }).then(() => {
            //     // Profile updated successfully
            //     console.log("User profile updated with full name:", name);
            //     console.log("User signed up:", user);

            //     cookies.set("auth-token", user.refreshToken);
            //     setIsAuth(true);

            // }).catch((error) => {
            //     // Handle errors updating profile
            //     console.error("Error updating user profile:", error);
            // });
        

            // user.getIdToken().then((refreshToken) => {
            //     // Set the refresh token as a cookie
            //     cookies.set("refresh-token", refreshToken, { path: "/" });
            //     // Update authentication state
            //     setIsAuth(true);
            // }).catch((error) => {
            //     // Handle error
            //     console.error("Error getting user ID token:", error);
            // });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        console.log("bro wahfewrvfet")
    };

    const handleSwitchSignUp = () => {
        setIsLogin(false);
    };

    const handleSwitchLogIn = () => {
        setIsLogin(true);
    };

    if (isAuth) {
        return <Navigate to="/" replace />; // Redirect if authenticated
    }

  return (
    <div className='signinpage'>
            <div className='switcher'>
            <button className={!isLogin ? 'switch active' : 'switch'} onClick={handleSwitchSignUp}>Sign Up</button>
                <button className={isLogin ? 'switch active' : 'switch'} onClick={handleSwitchLogIn}>Log In</button>
            </div>
            <form onSubmit={handleSubmit} id='form-holder'>
                
               <h2>{isLogin ? 'Welcome Back!' : 'Sign Up for Free'}</h2>

               {!isLogin && (
                    <input
                        type="text"
                        value={name}
                        placeholder='Full Name'
                        onChange={handleNameChange}
                        className='form-input'
                        required
                    />
                )}
                <input
                    type="email"
                    value={email}
                    placeholder='Email Address'
                    onChange={handleEmailChange}
                    className='form-input'
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder='Set A Password'
                    onChange={handlePasswordChange}
                    className='form-input'
                    required
                />
                <button className='submit-button' type="submit">{isLogin ? 'Log In' : 'Get Started'}</button>
                <Auth setIsAuth={setIsAuth} />
            </form>
    </div>
  )
}

export default SignIn