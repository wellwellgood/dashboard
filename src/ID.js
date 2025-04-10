import React, { useState, useEffect } from 'react';
import '../src/css/ID.css';
import { Link } from 'react-router-dom';

function ID() {
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [timer, setTimer] = useState(0);
    const [foundID] = useState('');

    // ⏳ 타이머 동작
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [timer]);

    // 📩 인증번호 생성 및 전송
    const handleSendCode = () => {
        if (!phoneNumber) {
            alert('📞 전화번호를 입력해주세요.');
            return;
        }
        const code = String(Math.floor(100000 + Math.random() * 900000)); // 6자리 인증번호
        setGeneratedCode(code);
        setTimer(180); // 3분 타이머 시작
        setIsVerified(false);
        alert(`인증번호 [${code}]가 전송되었습니다. (모의)`);
        console.log(code); // 실제 서비스에서는 서버에서 처리
    };

    // 🏃 인증번호 검증
    const handleVerifyCode = () => {
        if (verificationCode === generatedCode) {
            setIsVerified(true);
            alert('✅ 인증이 성공했습니다!');
        } else {
            alert('❌ 인증번호가 올바르지 않습니다.');
        }
    };

    // 🆔 아이디 찾기
    const handleFindID = () => {
        if (!isVerified) {
            alert('⚠️ 인증을 먼저 완료해주세요.');
            return;
        }
        if (!username || !phoneNumber) {
            alert('❗ 이름과 전화번호를 입력해주세요.');
            return;
        }
    };

    return (
        <div className='findID'>
            <Link to='/'>
                <div className='img'></div>
            </Link>
            <div className='IDform'>
                <div className='IDarea'>
                    <h1>아이디 찾기</h1>

                    <div className='username'>
                        <h2>User Name:</h2>
                        <input
                            className='name'
                            placeholder='이름'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='phonenumber'>
                        <h2>Phone Number:</h2>
                        <input
                            className='number'
                            placeholder='전화번호 (숫자만 입력)'
                            value={phoneNumber}
                            type="tel"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button onClick={handleSendCode} disabled={timer > 0}>
                            {timer > 0 ? `재전송 (${timer}s)` : '인증번호 받기'}
                        </button>
                    </div>

                    {/* 🔒 인증번호 입력 및 확인 */}
                    <div className='verification'>
                        <h2>인증번호:</h2>
                        <input
                            className='verifyCode'
                            placeholder='인증번호 입력'
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <button onClick={handleVerifyCode}>인증 확인</button>
                    </div>

                    {/* 🆔 아이디 찾기 버튼 */}
                    <div className='findBtn'>
                        <button onClick={handleFindID}>아이디 찾기</button>
                    </div>

                    {/* 🎉 아이디 표시 */}
                    {foundID && (
                        <div className='result'>
                            <h3>🎉 찾으신 아이디는: <span>{foundID}</span> 입니다.</h3>
                            <Link to='/login'>
                                <button className='goLogin'>로그인 하러 가기</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ID;