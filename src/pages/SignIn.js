import React, { useState } from 'react';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-in logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

  return (
    <div>
        <h2>Sign Up for Free</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default SignIn