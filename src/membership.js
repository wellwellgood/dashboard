import React, { useState } from "react";
import "../src/css/membership.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./api/auth/register"; // ✅ 회원가입 함수 불러오기

function LinkPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    phone1: "",
    phone2: "",
    phone3: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const { username, name, password, confirmPassword, phone1, phone2, phone3 } = formData;
    const fullPhone = `${phone1}-${phone2}-${phone3}`;

    if (!username.trim()) {
      newErrors.username = "아이디를 입력해주세요.";
    } else if (!/^[a-zA-Z0-9]{5,15}$/.test(username)) {
      newErrors.username = "아이디는 5~15자의 영문자 또는 숫자만 가능합니다.";
    }

    if (!name.trim()) newErrors.name = "이름을 입력해주세요.";
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "대문자가 하나 이상 포함되어야 합니다.";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "숫자가 하나 이상 포함되어야 합니다.";
    } else if (!/[^A-Za-z0-9]/.test(password)) {
      newErrors.password = "특수문자가 하나 이상 포함되어야 합니다.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!phone1 || !phone2 || !phone3) {
      newErrors.phone = "휴대폰 번호를 모두 입력해주세요.";
    } else if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(fullPhone)) {
      newErrors.phone = "휴대폰 번호 형식이 올바르지 않습니다.";
    }  else if (!/^\d+$/.test(phone2) || !/^\d+$/.test(phone3)) {
      newErrors.phone = "휴대폰 번호는 숫자만 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = {
          username: formData.username,
          name: formData.name,
          password: formData.password,
          phone: `${formData.phone1}-${formData.phone2}-${formData.phone3}`,
        };

        await registerUser(userData); // 📡 회원가입 요청
        alert("✅ 회원가입이 완료되었습니다!");
        navigate("/"); // 🎯 로그인 페이지로 이동
      } catch (error) {
        console.error("회원가입 실패:", error);
        setErrorMessage(error.message || "회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="membership">
      <Link to="/"><div className="img"></div></Link>
      <div className="membershipform">
        <h1>회 원 가 입</h1>
        <form className="membershiparea" onSubmit={handleSubmit}>
          <div className="ID">
            <h2>아이디 <span style={{ color: "red" }}>*</span></h2>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              class id="username"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="name">
            <h2>이름 <span style={{ color: "red" }}>*</span></h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              class id="name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="password">
            <h2>비밀번호 <span style={{ color: "red" }}>*</span></h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요 (8자 이상)"
              class id="password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="passwordcheck">
            <h2>비밀번호 확인 <span style={{ color: "red" }}>*</span></h2>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력해주세요"
              class id="confirmPassword"
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>

          <div className="phone">
            <h2>휴대폰 번호 <span style={{ color: "red" }}>*</span></h2>
            <h5>(예: 010-1234-5678)</h5>
            <select className="phone1" id="phone1" name="phone1" value={formData.phone1} onChange={handleChange}>
              <option value="">선택하세요</option>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
            </select>
            <i>-</i>
            <input type="tel" className="phone2" id="phone2" name="phone2" value={formData.phone2} onChange={handleChange} />
            <i>-</i>
            <input type="tel"  id="phone3" name="phone3" value={formData.phone3} onChange={handleChange} />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          {errorMessage && <p className="error">{errorMessage}</p>}

          <div className="member">
            <button type="submit">가 입 하 기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkPage;