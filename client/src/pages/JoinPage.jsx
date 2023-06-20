import React, { useCallback, useState } from 'react'
import "../assets/css/join.css";
import axios from 'axios';
import { Button } from 'semantic-ui-react'



const JoinPage = () => {

  // 이메일, 비밀번호, 닉네임 유효성 검사 
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

  const validateNickname = (nick) => {
    return nick
      .toLowerCase()
      .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/)
  }
  
  
   const [email, setEmail] = useState("");  //이메일
   const [nick, setNick] = useState(""); // 닉네임
   const [password, setPassword] = useState(""); //비밀번호
   const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인

   const [emailMsg, setEmailMsg] = useState("");  //이메일 형식 확인
   const [pwdMsg, setPwdMsg] = useState('');  //비밀번호 형식
   const [confirmPwdMsg, setConfirmPwdMsg]= useState("") //비밀번호 확인
   const [nicknameMsg, setNicknameMsg] = useState("")  //닉네임중복
    

   // 1-1에 잡아뒀던 유효성 검사 함수로 정리하기
    const isEmailValid = validateEmail(email);
    const isPwdValid = validatePwd(password);
    const isConfirmPwd = password === confirmPassword;
    const isNicknameValid = validateNickname(nick);

   //이메일 
    const onChangeEmail = useCallback( async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

      if (!validateEmail(currEmail)) {
        setEmailMsg("이메일 형식이 올바르지 않습니다.")
      } else {
          setEmailMsg("올바른 이메일 형식입니다.")
        }
      })

   //비밀번호
      const onChangePwd = useCallback((e) =>{
      const currPwd = e.target.value;
        setPassword(currPwd);
    
        if (!validatePwd(currPwd)) {
            setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.")
        } else {
          setPwdMsg("안전한 비밀번호입니다.")
          }
        }, [])

    //비밀번호 확인
      const onChangeConfirmPwd = useCallback((e) => {
      const currConfirmPwd = e.target.value;
      setConfirmPassword(currConfirmPwd);

      if (currConfirmPwd !== password) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.")
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.")
      }
    }, [password])
 
    //닉네임 확인
      const onChangeNickname = useCallback((e) => {
      const currNickname = e.target.value;
      setNick(currNickname);

      if (!validateNickname(currNickname)) {
        setNicknameMsg("1글자 이상 9글자 미만으로 입력해주세요.")
      } else {
        setNicknameMsg("올바른 닉네임 형식입니다.")
      }
    }, []);
  
    //이메일 닉네임 중복확인 
    const [checkMail, setCheckMail] = useState(false)
    // const [checkNickname, setCheckNickname] = useState(false)

    //이메일중복확인

    //const onCheckEmail = 


      // 서버 post로 보내기 
      // axios
      //   .post(url, 
      //   {
      //     'mem_email' : email,
      //     'mem_nick' : nick
      //   })
      //   .then(res)
      // Spring =>  @RequestBody Mem
      // Mem.mememail = email
      // Mem.mem_pw = null




    // const onCheckEmail = async (e) => {
    //   e.preventDefault();
  
    //   try { 
    //     const res = await Api.post("user/register/email", {email});
    //     const { result } = res.data;
  
    //     if (!result) {
    //         setEmailMsg("이미 등록된 메일입니다. 다시 입력해주세요.");
    //         setCheckMail(false);
    //     } else {
    //       setEmailMsg("사용 가능한 메일입니다.😊");
    //       setCheckMail(true);
    //     }
  
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // //닉네임 중복확인
    // const onCheckNickname = async (e) => {
    //   e.preventDefault();
  
    //   try { 
    //     const res = await Api.post("user/register/nickname", {nickname});
  
    //     const { result } = res.data;
  
    //     if (!result) {
    //         setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
    //         setCheckNickname(false);
    //    } else {
    //       setNicknameMsg("사용 가능한 닉네임입니다.😊");
    //       setCheckNickname(true);
    //     }
  
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }



  //회원가입 버튼 
  const onSubmitHandler = (e) => {
     
      // 비밀번호 같지않을 때 
      if(password !== confirmPassword){
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
      }

      const formData = new FormData();
      formData.append('mem_email', email);
      formData.append('mem_nick', nick);
      formData.append('mem_pw', password);

      console.log(formData)

      axios
      .post('http://172.30.1.20:8087/hogward/joinmember', formData)
      .then((res) => {
        console.log(res.data);
        // res.data = 1 & window.location.href =
        // alert('등록되었습니다.');
      })
      .catch((error) => {
        console.error(error);
        // alert('Error!');
        console.log(error.res);
        console.log(formData);
      });


      // 서버 post로 보내기 
      // axios
      //   .post(url, 
      //   {
      //     'mem_email' : email,
      //     'mem_nick' : nick
      //   })
      //   .then(res)
      // Spring =>  @RequestBody Mem
      // Mem.mememail = email
      // Mem.mem_pw = null

      // 서버 get 으로 보내기 
      // axios
      //  .get(url, 
      //   {
      //     params : {
      //       'mem_email' : email,
      //       'mem_nick' : nick
      //     }
      //   })

      //   Spring => @RequestParam('mem_email')
      
}

  return (
    
  <div className='login-box'>
     
      
      <h1>HOGWARD</h1>
      <form>

        {/* 이메일 입력*/}
        <div className='user-box'>
          <div className ="info__id">
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChangeEmail} 
            required=""
            placeholder='이메일을 입력해 주세요'
          />
          <button type="button" class="btn btn-dark">중복확인</button>
          </div>
          <p>{emailMsg}</p>
        </div>

        {/* 닉네임 입력 */}
        <div className='user-box'>
        <div className ="info__id">
          <input
            type="text"
            id="nick"
            value={nick}
            onChange={onChangeNickname}
            required=""
            placeholder='닉네임을 입력해 주세요'
          />
          <button type="button" class="btn btn-dark">중복확인</button>
          </div>
          <p>{nicknameMsg}</p>
        </div>
      
        {/* 비밀번호 입력 */}
        <div className='user-box'>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePwd}
            required=""
            placeholder='비밀번호를 입력해 주세요'
          />
          <p>{pwdMsg}</p>
        </div>

        {/* 비밀번호 다시 입력 */}
        <div className='user-box'>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={onChangeConfirmPwd}
            required=""
            placeholder='비밀번호를 다시 입력해주세요'
          />
          <p>{confirmPwdMsg}</p>
          <p>{isConfirmPwd}</p>
        </div>

        <br></br>

        <div class="d-grid gap-2">
        <button type= "button" href="/login" class="btn btn-dark btn btn-lg" onClick={onSubmitHandler}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        가입하기
        </button>
        </div>

      </form>
      
      </div> 
    
 
  )
}

export default JoinPage


