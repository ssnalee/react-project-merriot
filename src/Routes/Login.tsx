import { useState } from "react";
import styled from "styled-components";

const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(to left, #c9eafd, #eff5ff);
`;
const SignBox = styled.div`
  position : relative;
  width : 450px;
  display:flex;
  align-items :center;
  margin-bottom :10px;
  button.summitBtn{
    top:-100px;
  }
`;
const SignLabel = styled.label`
 display:inline-block;
 width:130px;
 text-align : right;
 padding-right:20px;
`;
const InputBox = styled.div`
  &.int-area {
    width: 400px;
    position: relative;
    margin-top: 20px;
  }
  &.int-area:first-child {
    margin-top: 0;
  }
  &.btn-area {
    margin-top: 60px;
    display: flex;
    width: 400px;
    justify-content: space-between;
  }
  &.btn-area button {
    width: 47%;
    height: 50px;
    font-size: 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    background-color: #fff;
    color: #4389f5;
    box-shadow: 3px 3px 2px 1px rgba(0, 0, 255, 0.2);
  }
  &.btn-area button.active {
    background-color: #80aff7;
    color: #fff;
  }
`;
const LoginInput = styled.input`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  outline: none;
`;
const SignInput = styled.input`
width:300px;
padding: 20px 10px 15px;
background-color:#fff;
border-radius:6px;
border:none;
font-size: 18px;
outline: none;
`;
const LoginLabel = styled.label`
  position: absolute;
  left: 10px;
  top: 15px;
  font-size: 18px;
  color: #999;
  transition: all 0.5s ease;
  &.warning {
    color: red !important;
    animation: warning 0.3s ease;
    animation-iteration-count: 3;
  }
`;
// @keyframes warning {
//     0% {
//       transform: translateX(-8px);
//     }
//     25% {
//       transform: translateX(8px);
//     }
//     50% {
//       transform: translateX(-8px);
//     }
//     75% {
//       transform: translateX(8px);
//     }
//   }
function Login() {
  let [flag, setFlag] = useState(1);
  return (
    <LoginWrap>
      {flag === 0 ? (
        <>
          <SignBox>
            <SignLabel htmlFor="userId">아이디</SignLabel>
            <SignInput type="text" name="userId" id="userId" />
          </SignBox>
          <SignBox>
            <SignLabel htmlFor="userPw">비밀번호</SignLabel>
            <SignInput type="text" name="userPw" id="userPw" />
          </SignBox>
          <SignBox>
            <SignLabel htmlFor="userPw2">비밀번호 확인</SignLabel>
            <SignInput type="text" name="userPw2" id="userPw2" />
            <button type="submit" className="summitBtn">생성</button>
          </SignBox>
        </>
      ) : (
        <>
          <InputBox className="int-area">
            <LoginInput type="text" name="userId" id="userId" required />
            <LoginLabel htmlFor="userId">아이디</LoginLabel>
          </InputBox>
          <InputBox className="int-area">
            <LoginInput type="password" name="userPw" id="userPw" required />
            <LoginLabel htmlFor="userPw">비밀번호</LoginLabel>
            <button id="Lbtn" type="submit" className="summitBtn">확인</button>
          </InputBox>

        </>
      )}
      <InputBox className="btn-area">
        <button
          type="button"
          className={flag == 0 ? "active" : ""}
          onClick={() => {
            setFlag(0);
          }}
        >
          회원가입
        </button>
        <button
          type="button"
          className={flag == 1 ? "active" : ""}
          onClick={() => {
            setFlag(1);
          }}
        >
          LOGIN
        </button>
      </InputBox>
    </LoginWrap>
  );
}

export default Login;
