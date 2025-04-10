import React from "react";
import { Link } from "react-router-dom";
import "../src/css/password.css";

function password() { 
    return (
        <div className="password">
            <Link to="/">
                <div className="img"></div>
            </Link>
            <div className="findpw">
                <div className="findpwform">
                    <div className="findpassword">
                        <h1>비밀번호 찾기</h1>
                        <div className="searchIDform">
                            <input type="text" className="searchID" placeholder="아이디를 입력해 주세요"/>
                        </div>
                        <div className="searchphoneform">
                            <input type="tel" className="phoneNB" placeholder="전화번호를 입력해주세요"/>
                        </div>
                        <div className="fintsearchPW">
                            <Link to="">
                                비 밀 번 호  찾 기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default password;