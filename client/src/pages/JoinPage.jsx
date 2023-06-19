import React, { useState } from 'react'
import "../assets/css/login.css";


const JoinPage = () => {

  //이메일
  const [email, setEmail] = useState("");
  //닉네임 
   const [name, setName] = useState("");
  //비밀번호
  const [password, setPassword] = useState("");
  //비밀번호 확인 
  const [confirmPassword, setConfirmPassword] = useState("");
  

  //이메일 입력 
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  //닉네임 입력 
    const onNameHandler = (event) => {
      setName(event.currentTarget.value);
  }

  //비밀번호 입력 
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }

  // 비밀번호확인 입력 
  const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value);
  }


  //회원가입 버튼 
  const onSubmitHandler = (e) => {
      
      if(password !== confirmPassword){
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
      }

      // e.preventDefault();
      // fetch('http://서버IP:3000/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json;charset=utf-8' },
      //   body: JSON.stringify({
      //     email: userInput.email,  // 백엔드에서 key를 뭐로 받는지 확인하고 작성 
      //     password: userInput.password,
      //   }),
      // })
      //   .then(res => res.json())
      //   .then(data => console.log(data));
  }


  return (
    <div className='login-box'>
     
     <h1></h1>
      <form
            method="post"
            action="http://172.30.1.20:8087/hogward/join"
            encType="multipart/form-data"
      >
        <div className='user-box'>
          <tr>
          <td>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailHandler}
            required=""
            placeholder='이메일'
            name = "mem_email"
          />
          </td>
          <td>
          <button type="button" class="btn btn-dark">중복확인</button>
          </td>
          </tr>
        </div>

        <div className='user-box'>
          <tr>
            <td>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onNameHandler}
            required=""
            placeholder='닉네임'
            name = "mem_nick"
          />
          </td>
          <td><button type="button" class="btn btn-dark">중복확인</button></td>
          </tr>
        </div>
      
        <div className='user-box'>
          <tr>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordHandler}
            required=""
            placeholder='비밀번호'
            name = "mem_pw"
          />
          </tr>
        </div>

        <div className='user-box'>
          <tr>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            required=""
            placeholder='비밀번호확인'
          />
          </tr>
        </div>
        
        <div class="d-grid gap-2">
        <tr>
        <button type= "button" href="#" class="btn btn-dark btn btn-lg" onClick={onSubmitHandler}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        회원가입
        </button>
        </tr>
        </div>

      </form>
      
    </div>
  )
}

export default JoinPage