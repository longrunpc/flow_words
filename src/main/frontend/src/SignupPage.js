import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNum, setPhoneNum] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/signup', {
                name: name,
                email: email,
                password: password,
                phoneNum: phoneNum
            });

            // 회원 가입 성공 시 처리
            console.log('Signup successful:', response.data);
            alert('Signup successful! Please login.'); // 회원 가입 성공 알림

            // 로그인 페이지로 이동
            navigate('/login');
        } catch (error) {
            // 회원 가입 실패 시 처리
            console.error('Signup error:', error);
            alert('Failed to sign up');
        }
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
