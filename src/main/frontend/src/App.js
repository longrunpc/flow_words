import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // App.css 파일을 import

function App() {
    const [data, setData] = useState('');
    const [inputText, setInputText] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('/api/data')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const sendDataToBackend = () => {
        setIsLoading(true); // 로딩 상태 시작
        axios.post('/api/send', { message: inputText })
            .then(res => {
                console.log('데이터 전송 성공:', res.data);
                setResponseMessage(res.data); // 백엔드에서 응답받은 데이터를 상태로 설정
                setInputText('');
                setIsLoading(false); // 로딩 상태 종료
            })
            .catch(err => {
                console.error('데이터 전송 오류:', err);
                setIsLoading(false); // 로딩 상태 종료
            });
    };

    return (
        <div className="container">
            <div>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="글자를 입력하세요"
                    rows="10" // 줄 수를 조정하여 크기를 변경
                    style={{ width: '100%', resize: 'none' }} // 스타일을 추가하여 너비를 100%로 설정하고 크기 조정 기능을 비활성화
                />
                <button onClick={sendDataToBackend} disabled={isLoading}>
                    {isLoading ? '보내는 중...' : '보내기'}
                </button>
            </div>
            <div>
                안녕하세요 : {data}님
            </div>
            <div>
                {responseMessage && <p>서버 응답: {responseMessage}</p>}
            </div>
        </div>
    );
}

export default App;
