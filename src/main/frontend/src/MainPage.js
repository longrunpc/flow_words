// src/MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="main-page">
            <h1>Welcome to Our App</h1>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
    );
};

export default MainPage;
