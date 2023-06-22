import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import "../assets/css/login.css";
import { colors } from "@mui/material";
import { SessionContext } from "../contexts/SessionContext";

const LoginPage = () => {
  // 세션 context
  const { setSessionUser } = useContext(SessionContext);
  // 이메일, 비밀번호 유효성 검사
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };

  // 세션
  const handleLoginSession = async (user) => {
    // 사용자 정보를 세션 스토리지에 저장
    sessionStorage.setItem("user", JSON.stringify(user));
    setSessionUser(user);
  };

  const [email, setEmail] = useState(""); // 아이디 입력 상태
  const [emailMsg, setEmailMsg] = useState(""); //이메일 형식 확인
  const [password, setPassword] = useState(""); //비밀번호
  const [pwdMsg, setPwdMsg] = useState(""); //비밀번호 형식

  //이메일 형식 확인
  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
    } else {
      // setEmailMsg("올바른 이메일 형식입니다.")
      setEmailMsg(" ");
    }
  });

  //비밀번호
  const onChangePwd = useCallback((e) => {
    const currPwd = e.target.value;
    setPassword(currPwd);

    if (!validatePwd(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
    } else {
      // setPwdMsg("안전한 비밀번호입니다.")
      setPwdMsg(" ");
    }
  }, []);

  //로그인 버튼 클릭
  const handleLogin = () => {
    //아이디 비밀번호 일치 확인 여부
    const formData = new FormData();
    formData.append("mem_email", email);
    formData.append("mem_pw", password);

    axios
      .post("http://172.30.1.22:8087/hogward/logincheck", formData)
      .then((res) => {
        // 1이면 로그인 성공

        if (res.data) {
          // 1이면 로그인 성공
          handleLoginSession({
            email,
            nick: res.data,
          });
          alert("환영합니다!");
          window.location.href = "/";
        } else {
          // 0이면 로그인 실패
          alert("로그인에 실패했습니다. 다시 시도해 주세요.");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error(error);
        // alert('Error!');
        console.log(error.res);
        console.log(formData);
      });
  };

  return (
    <div className="login-box-container">
      <div className="login-box">
        {/* 로고 */}

        {/* 로그인 제목 */}
        <h1>HOGWARD</h1>

        <form>
          {/* 아이디 입력란 */}
          <div className="user-box">
            <input
              className="input-box"
              type="email"
              // id="email"
              value={email}
              onChange={onChangeEmail}
              required=""
              placeholder="이메일을 입력해 주세요"
            />
            <p className="red">{emailMsg}</p>
          </div>
          <br></br>
          {/* 비밀번호 입력란 */}
          <div className="user-box">
            <input
              className="input-box"
              type="password"
              id="password"
              value={password}
              onChange={onChangePwd}
              required=""
              placeholder="비밀번호를 입력해 주세요"
            />
            <p className="red">{pwdMsg}</p>
          </div>
          <br></br>
          <br></br>

          {/* 로그인 버튼 */}
          <div class="d-grid gap-2">
            <button
              type="button"
              onClick={handleLogin}
              class="btn btn-dark btn btn-lg"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
