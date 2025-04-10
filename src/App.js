import React, { useState } from "react";
import "../src/css/App.css";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import Membership from "./membership";
import IDpage from "./ID";
import Password from "./password";
import Video from "./image/background.mp4";
import { loginUser } from "./api/auth/login"; // 🔥 axios 로그인 함수 가져오기
import DASHBOARD from "./DashBoard";
import DashboardPage from "./DashBoard";

function LoginPage() {
  const navigate = useNavigate();
  const [ID, setId] = useState("");
  const [PW, setPw] = useState("");
  const [PWvalid, setPWvalid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const HandleID = (e) => {
    const value = e.target.value;
    setId(value);
    const regex = /^[A-Za-z0-9][A-Za-z0-9]*$/;
    setNotAllow(!regex.test(value));
  };

  const HandlePW = (e) => {
    const value = e.target.value;
    setPw(value);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
    setPWvalid(regex.test(value));
  };

  const loginButton = async () => {
    try {
      const result = await loginUser({ username: ID, password: PW }); // 💡 axios 요청
      alert("로그인에 성공했습니다.");
      console.log("서버 응답:", result);
      setErrorMessage("");
      navigate("/DASHBOARD"); // ✅ 로그인 성공 시 페이지 이동
    } catch (err) {
      console.error("로그인 실패:", err);
      setErrorMessage("아이디나 비밀번호를 확인해주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginButton(); // Enter 키를 누르면 로그인 버튼 클릭처럼 동작
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="video-container">
          <video autoPlay loop muted className="video">
            <source src={Video} type="video/mp4" />
          </video>
        </div>
        <div className="login">
          <div className="loginform">
            <div className="logo"></div>
            <h1 className="text">LOGIN</h1>
            <div className="loginbox">
              <input
                className="id"
                type="text"
                placeholder="ID"
                value={ID}
                onChange={HandleID}
              />
              <input
                className="pw"
                type="password"
                placeholder="Password"
                value={PW}
                onChange={HandlePW}
                onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button
              className="linkpage"
              onClick={loginButton} // 로그인 버튼 클릭
              disabled={!PWvalid || notAllow} // 비밀번호 유효성 체크 및 아이디 형식 체크
            >
              <h2>Login</h2>
            </button>
            <div className="findbox">
              <Link to="/ID">
                <button>아이디 찾기</button>
              </Link>
              <Link to="/PASSWORD">
                <button>비밀번호 찾기</button>
              </Link>
              <Link to="/MEMBERSHIP">
                <button>회원가입</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

// 🛣️ 전체 라우터 설정
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ID" element={<IDpage />} />
        <Route path="/MEMBERSHIP" element={<Membership />} />
        <Route path="/PASSWORD" element={<Password />} />
        <Route path="/DASHBOARD" element={<DASHBOARD />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}