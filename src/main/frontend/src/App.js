import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AppPage from './AppPage';
import './App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


    // 이펙트 훅을 사용하여 페이지 로드 시 인증 상태를 확인하도록 설정
    useEffect(() => {
        const token = localStorage.getItem('token'); // 예시: localStorage에 인증 토큰이 저장되어 있는지 확인
        if (token) {
            setAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = () => {
        setAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
        localStorage.removeItem('refreshToken'); // 로컬 스토리지에서 리프레시 토큰 삭제
        setAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>; // 인증 상태를 확인하는 동안 로딩 화면 표시
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={authenticated ? <Navigate to="/app" /> : <LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={authenticated ? <Navigate to="/app" /> : <SignupPage />} />
                <Route path="/app" element={authenticated ? <AppPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
