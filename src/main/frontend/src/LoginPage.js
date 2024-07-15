import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // useHistory 제거
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 사용

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password
            });

            let accessToken = response.headers['authorization'];
            let refreshToken = response.headers['authorization-refresh'];

            console.log('access token :', accessToken);
            console.log('refresh token :', refreshToken);
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            alert('로그인 성공!');
            navigate('/app'); // navigate 함수를 사용하여 /app 페이지로 이동
        } catch (error) {
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
            <p>
                아직 회원이 아니신가요? <Link to="/signup">회원 가입</Link>
            </p>
        </div>
    );
};

export default LoginPage;
