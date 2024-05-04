import React, { useState } from 'react';
import '../styles/SignIn.css';

function SignIn() {
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
    };

    const handleSwitchSignUp = () => {
        setIsLogin(false);
    };

    const handleSwitchLogIn = () => {
        setIsLogin(true);
    };

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
            </form>
    </div>
  )
}

export default SignIn