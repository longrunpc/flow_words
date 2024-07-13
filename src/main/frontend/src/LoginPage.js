import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });

            // 로그인 성공 시 처리
            console.log('Login successful:', response.data);

            const accessToken = response.data.AccessToken;
            const refreshToken = response.data.RefreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert('로그인 성공!');
            navigate('/app'); // 로그인 성공 후 /app 페이지로 이동
        } catch (error) {
            // 로그인 실패 시 처리
            console.error('Login error:', error);
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
