import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import AppPage from './AppPage';
import './App.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    // 이펙트 훅을 사용하여 페이지 로드 시 인증 상태를 확인하도록 설정
    useEffect(() => {
        // 여기에서 인증 상태를 확인하는 비동기 로직을 추가할 수 있음
        // 예: 서버로부터 인증 상태를 조회하여 setAuthenticated(true) 혹은 setAuthenticated(false) 호출
        // 실제로는 서버와의 통신이 필요하지만 예시로 간단하게 구현
        const isLoggedIn = localStorage.getItem('token'); // 예시: localStorage에 인증 토큰이 저장되어 있는지 확인
        if (isLoggedIn) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    const PrivateRoute = ({ element, ...rest }) => {
        return authenticated ? element : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/app" element={<PrivateRoute element={<AppPage />} />} />
            </Routes>
        </Router>
    );
};

export default App;
