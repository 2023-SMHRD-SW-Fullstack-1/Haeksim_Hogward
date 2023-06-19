import React, { useState } from 'react'
import "../assets/css/login.css";


const JoinPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] =useState("");

  //이메일 입력 
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  //비밀번호 입력 
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }

  // 비밀번호확인 입력 
  const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value);
  }

  //닉네임 입력 
  const onNameHandler = (event) => {
      setName(event.currentTarget.value);
  }

  //주소 입력 
  const onAddressHandler = (event) => {
    setAddress(event.currentTarget.value);
}

  //회원가입 버튼 
  const onSubmitHandler = (event) => {
      event.preventDefault();
  }

  if(password !== confirmPassword){
    return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
  }


  return (
    <div className='loin-box'>
     
     <h1></h1>
      <form>
        <div className='user-box'>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onEmailHandler}
            required=""
            placeholder='아이디'
          />
          
        </div>
        <div className='user-box'>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordHandler}
            required=""
            placeholder='비밀번호'
          />
        </div>

        <div className='user-box'>
          <input
            type="password"
            id="password"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            required=""
            placeholder='비밀번호확인'
          />
        </div>

        <div className='user-box'>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onNameHandler}
            required=""
            placeholder='닉네임'
          />
        </div>

        <div className='user-box'>
          <input
            type="text"
            id="address"
            value={address}
            onChange={onAddressHandler}
            required=""
            placeholder='주소'
          />
        </div>

        <div class="d-grid gap-2">
        <button type= "button" href="#" class="btn btn-dark btn btn-lg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        회원가입
        </button>
        </div>

      </form>
      
    </div>
  )
}

export default JoinPage