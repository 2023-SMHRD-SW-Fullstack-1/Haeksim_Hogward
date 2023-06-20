import React, {useCallback, useState } from 'react'
import axios from 'axios';
import "../assets/css/login.css";


 const LoginPage = () => {

  // 이메일, 비밀번호 유효성 검사 
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    };

    const validatePwd = (password) => {
      return password
        .toLowerCase()
        .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
    }

  const [email, setEmail] = useState('');  // 아이디 입력 상태
  const [emailMsg, setEmailMsg] = useState("");  //이메일 형식 확인
  const [password, setPassword] = useState(""); //비밀번호
  const [pwdMsg, setPwdMsg] = useState('');  //비밀번호 형식


    //이메일 형식 확인
    const onChangeEmail = useCallback( async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

      if (!validateEmail(currEmail)) {
        setEmailMsg("이메일 형식이 올바르지 않습니다.")
      } else {
          // setEmailMsg("올바른 이메일 형식입니다.")
          setEmailMsg(" ")
        }
      })


    //비밀번호
     const onChangePwd = useCallback((e) =>{
     const currPwd = e.target.value;
      setPassword(currPwd);
  
      if (!validatePwd(currPwd)) {
          setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.")
      } else {
        // setPwdMsg("안전한 비밀번호입니다.")
        setPwdMsg(" ")
        }
      }, [])


  // //아이디 입력 값 변경 이벤트 헨들러 
  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // //비밀번호 입력 값 변경 이벤트 핸들러 
  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  //로그인 버튼 클릭 
  const handleLogin = () => {
    
    //서버에서 가져온값과 연결 
    console.log('Email:', email);
    console.log('Password:', password);
  
    //서버로 로그인 요청 보내기 
    // axios
    // .post('http://localhost:8094/spofit/member/login', { m_id: username, m_pw: password },{ headers:{ 'Content-Type' : "application/json"}})
    // .then((response) => {
    //   const loginResult = response.data[1];
    //   console.log('로그인 리저트 : '+loginResult);
    //   if (loginResult != null) {
    //     alert(username+'님 환영합니다!!');
    //     console.log('로그인 성공!');
    //     sessionStorage.setItem('accessMemberSeq', response.data[0]);
    //     sessionStorage.setItem('accessMemberNick', response.data[1]);
    //     window.location.href = '/';
    //   } else{
    //     alert('로그인에 실패하였습니다.');
    //     console.log('로그인 실패');
    //   }
    // })
    // .catch((error) => {
    //   console.error('로그인 요청 실패:', error);
    // });

  };
   

  return (
    <div className='login-box'>
     
     {/* 로고 */}

     {/* 로그인 제목 */}
     <h3>Welcome to the</h3>
     <h1>HOGWARD</h1>


      <form>

        {/* 아이디 입력란 */}
        <div className='user-box'>
          <input
            type="email"
            // id="email"
            value={email}
            onChange={onChangeEmail}
            required=""
            placeholder='이메일 '
          />
          <p>{emailMsg}</p>
        </div>
        <br></br>
        {/* 비밀번호 입력란 */}
        <div className='user-box'>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePwd}
            required=""
            placeholder='비밀번호'
          />
          <p>{pwdMsg}</p>
        </div>
        <br></br>
        <br></br>

        {/* 로그인 버튼 */}
        <div class="d-grid gap-2">
        <button type= "button" href="#" onClick={handleLogin} class="btn btn-dark btn btn-lg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        로그인
        </button>
        </div>

      </form>
      
    </div>
  )
}

export default LoginPage