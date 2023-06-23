import React, { useCallback, useState } from "react";
import "../assets/css/join.css";
import axios from "axios";
import { Button } from "semantic-ui-react";

const JoinPage = () => {
  
  // 이메일 유효성 검사 
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };
  
  //비밀번호 유효성 검사 
  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };

  //닉네임 유효성 검사 
  const validateNickname = (nick) => {
    return nick.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/);
  };

  const [email, setEmail] = useState(""); //이메일
  const [nick, setNick] = useState(""); // 닉네임
  const [password, setPassword] = useState(""); //비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인

  const [emailMsg, setEmailMsg] = useState(""); //이메일 형식 확인
  const [pwdMsg, setPwdMsg] = useState(""); //비밀번호 형식
  const [confirmPwdMsg, setConfirmPwdMsg] = useState(""); //비밀번호 확인
  const [nicknameMsg, setNicknameMsg] = useState(""); //닉네임중복



  //이메일 
 const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (currEmail == "") {
      setEmailMsg("");
    } else if(!validateEmail(currEmail)){
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
    } else{
      setEmailMsg("올바른 이메일 형식입니다.");
    }
  }, []);

  //닉네임 
  const onChangeNickname = useCallback((e) => {
    const currNickname = e.target.value;
    setNick(currNickname);
  
     if (currNickname == ""){
      setNicknameMsg("");
     } else if(!validateNickname(currNickname)) {
      setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.");
     } else {
      setNicknameMsg("올바른 닉네임 형식입니다.");
     }
  }, []);


  //비밀번호 
  const onChangePwd = useCallback(async (e) => {
    const currPwd = e.target.value;
    setPassword(currPwd);

    if(currPwd == ""){
      setPwdMsg("");
    } else if (!validatePwd(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
    }
  }, []);


  //비밀번호 확인
  const onChangeConfirmPwd = useCallback(
    (e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPassword(currConfirmPwd);

      if(currConfirmPwd == ""){
        setConfirmPwdMsg("")
      } else if(currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.");
      }
    },
    [password]
  );



    // 유효성 검사 함수로 정리
    const isEmailValid = validateEmail(email);
    const isPwdValid = validatePwd(password);
    const isConfirmPwd = password === confirmPassword;
    const isNicknameValid = validateNickname(nick);
  
    // 유효성 검사 한번에 묶어주기 
    const isAllValid = isEmailValid && isPwdValid && isConfirmPwd && isNicknameValid;

  // 이메일서버로 보내기
  // 가져온값 0 이면 사용가능 , 1이면 사용불가능
  const onCheckEmail = (e) => {
    const formData = new FormData();
    formData.append("mem_email", email);

    axios
      .post("http://172.30.1.22:8087/hogward/emailcheck", formData)
      .then((res) => {
        if (res.data == 0) {
          alert("사용 가능한 이메일 입니다.");
        } else {
          alert("중복된 이메일 입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 닉네임 서버로 보내기
  // 가져온값 0 이면 사용가능 , 1이면 사용불가능
  const onCheckNick = (e) => {
    const formData = new FormData();
    formData.append("mem_nick", nick);

    axios
      .post("http://172.30.1.20:8087/hogward/nickcheck", formData)
      .then((res) => {
        if (res.data == 0) {
          alert("사용 가능한 닉네임 입니다.");
        } else {
          alert("중복된 닉네임 입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //회원가입 버튼
  const onSubmitHandler = (e) => {
    // 비밀번호 같지않을 때
    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    //이메일, 닉네임, 패스워드 서버로 보내기
    const formData = new FormData();
    formData.append("mem_email", email);
    formData.append("mem_nick", nick);
    formData.append("mem_pw", password);

    axios
      .post("http://172.30.1.20:8087/hogward/joinmember", formData)
      .then((res) => {
        console.log(res.data);

        if (res.data == 1) {
          // 1이면 회원가입 성공
          alert("회원가입이 성공적으로 완료되었습니다.");
          window.location.href = "/login";
        } else {
          // 0이면 회원가입 실패
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }

        // res.data = 1 & window.location.href = '/join''
        // res.data = 1 & window.location.href =
        // alert('등록되었습니다.');
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
        <h1>회원가입</h1>
        <h2>호그와드에 오신것을 환영합니다.</h2>
        <h3>회원가입하신 후 다양한 서비스를 이용해보세요.</h3>
        <form>
          {/* 이메일 입력*/}
          <div className="user-box">
            <div className="info__id">
              <input
                type="email"
                id="email"
                value={email}
                onChange={onChangeEmail}
                required=""
                placeholder="이메일을 입력해 주세요"
              />
              <button type="button" class="btn btn-dark" onClick={onCheckEmail}>
                중복확인
              </button>
            </div>
            <p className="joincheck">{emailMsg}</p>
          </div>

          {/* 닉네임 입력 */}
          <div className="user-box">
            <div className="info__id">
              <input
                type="text"
                value={nick}
                onChange={onChangeNickname}
                required=""
                placeholder="닉네임을 입력해 주세요"
              />
              <button type="button" class="btn btn-dark" onClick={onCheckNick}>
                중복확인
              </button>
            </div>
            <p className="joincheck">{nicknameMsg}</p>
          </div>

          {/* 비밀번호 입력 */}
          <div className="user-box">
            <input
              value={password}
              type ="password"
              onChange={onChangePwd}
              required=""
              placeholder="비밀번호를 입력해 주세요"
            />
            <p className="joincheck">{pwdMsg}</p>
          </div>

          {/* 비밀번호 다시 입력 */}
          <div className="user-box">
            <input
              value={confirmPassword}
              type ="password"
              onChange={onChangeConfirmPwd}
              required=""
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <p className="joincheck">{confirmPwdMsg}</p>
          </div>

          <br></br>

          <div class="d-grid gap-2">
            <button
              href="/login"
              class="btn btn-dark btn btn-lg" 
              onClick={onSubmitHandler}
              disabled={!isAllValid} // disabled 비활성화 
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
