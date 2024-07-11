// src/SignupPage.js
import React from 'react';
import './SignupPage.css';

const SignupPage = () => {
    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
