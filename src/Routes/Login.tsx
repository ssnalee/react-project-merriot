import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { login, postUserInfo } from "./api";
import { useNavigate } from "react-router-dom";
import { idCheck } from "./api";

const SIZE_MOBILE = 480;

const Warning = keyframes`
    0% {
      transform: translateX(-8px);
    }
    25% {
      transform: translateX(8px);
    }
    50% {
      transform: translateX(-8px);
    }
    75% {
      transform: translateX(8px);
    }
`;
const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(to left, #c9eafd, #eff5ff);
  button {
    border: none;
    cursor: pointer;
    box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  button.summitBtn {
    border-radius: 8px;
    background-color: #80aff7;
    color: #fff;
    height: 120px;
    width: 80px;
    margin-left: 20px;
    top: -100px;
  }
  button.summitBtn:hover {
    background-color: #3887ff;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    margin-bottom: 30px;
    flex-direction:column;
    button.summitBtn {
      height: 45px;
      width: 300px;
      margin: 30px 0 0;
    }
  }
`;
const LoginBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const SignBox = styled.div`
  position: relative;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 25px;
  button.clearBtn {
    height: 50px;
    width: 55px;
    border-radius: 8px;
    background-color: #fff;
    color: #4389f5;
  }
  button.idCheck {
    background-color: #80aff7;
    color: #fff;
    height: 50px;
    width: 70px;
    margin: 0 10px;
    border-radius: 8px;
  }
  button.addUserBtn {
    width: 400px;
    height: 50px;
    background-color: #1871ff;
    color: #fff;
    margin: 0 0 20px;
    border-radius: 8px;
  }
  button.addUserBtn:disabled {
    background-color: #999;
    cursor: auto;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.4);
  }
  span {
    position: absolute;
    left: 140px;
    bottom: -20px;
    font-size: 12px;
    z-index: 1;
    color: #5d5c5c;
  }
  span.success_txt {
    color: #007bff;
    font-weight: 700;
    bottom: 0px;
    left: 170px;
  }
  span.warning_txt {
    color: red;
    font-weight: 700;
    bottom: 0px;
    left: 170px;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    width: 300px;
    flex-wrap:wrap;
    &:first-child{
      margin-bottom: 0;
    }
    button.clearBtn {
      height: 45px;
      width: 55px;
      margin: 25px 0 10px;
    }
    button.idCheck {
      height: 45px;
      width: 70px;
      margin: 25px 10px 10px 0;
    }
    button.addUserBtn {
      width: 300px;
      height: 45px;
      margin: 0;
    }
    span {
      top:50px;
      left:60px;
    }
    span.id_rule{
      left:120px;
    }
    span.success_txt {
      left: 110px;
      top: -15px;
    }
    span.warning_txt {
      left: 110px;
      top: -15px;
    }
  }
`;
const SignInput = styled.input`
  width: 300px;
  padding: 20px 10px 15px;
  background-color: #fff !important;
  border-radius: 6px;
  border: none;
  font-size: 15px;
  outline: none;
  box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.2);
  &[type="text"] {
    width: 140px;
  }
  &:focus {
    border: 2px solid #4389f5;
  }
  &:disabled {
    background-color: #fff;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    width: 200px;
    padding: 15px 10px;
    font-size: 13px;
    &[type="text"] {
      width: 200px;
    }
  }
`;
const SignLabel = styled.label`
  display: inline-block;
  width: 130px;
  text-align: right;
  padding-right: 20px;
  font-size: 15px;
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    width: 100px;
    font-size: 12px;
    padding-right: 10px;
  }
`;
const InputBox = styled.div`
  &.int-area {
    width: 300px;
    position: relative;
    margin-top: 20px;
  }
  &.int-area:first-child {
    margin-top: 0;
  }
  &.int-area label.warning {
    color: red !important;
    animation: warning 0.3s ease;
    animation-iteration-count: 3;
  }
  &.int-area input:focus + label,
  &.int-area input:valid + label {
    top: -2px;
    font-size: 13px;
    color: #0066ff;
  }
  &.btn-area {
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
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    &.int-area {
      width: 250px;
      margin-top: 10px;
    }
    &.btn-area {
      width:300px;
    }
    &.btn-area button {
      font-size: 17px;
      box-shadow: 2px 1px 1px 1px rgba(0, 0, 255, 0.2);
      height: 45px;
    }
  }
`;
const LoginInput = styled.input`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent !important;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  outline: none;
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    font-size: 15px;
  }
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
    animation: ${Warning} 0.3s ease;
    animation-iteration-count: 3;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    font-size: 15px;
  }
`;

function Login() {
  //input focus 위함
  const inputRef = useRef<HTMLInputElement>(null);
  const inputPwRef = useRef<HTMLInputElement>(null);
  //flag 0 = 회원가입 탭 flag 1 = 로그인 탭
  let [flag, setFlag] = useState(1);

  //아이디 정규식
  const pattern = new RegExp("^[a-zA-Z][0-9a-zA-Z]{5,11}$");
  const pwPattern = new RegExp(
    "^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$"
  );
  //회원가입 userInfo
  const [myUserInfo, setMyUserInfo] = useState({
    userId: "",
    userPw: "",
    userPw2: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    userPw: "",
  });
  // const { loginId, loginPw } = loginInfo;
  //아이디 중복체크값
  const [dbIdCheck, setDbIdCheck] = useState(false);
  const navigate = useNavigate();
  const { userId, userPw, userPw2 } = myUserInfo;
  //비밀번호와 비밀번호확인 같은지 확인
  const isSame = userPw === userPw2;
  //계정생성 다 입력했는지 확인
  const isVaild = userId !== "" && userPw !== "" && isSame && dbIdCheck;

  //계정 생성 입력시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserInfo({
      ...myUserInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };
  //로그인 폼 입력시
  const loginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value.trim(),
    });
  };
  //아이디 중복 체크 버튼 클릭시
  const handleIdCheck = async () => {
    if (userId == "") {
      alert("아이디를 입력하세요.");
      inputRef.current?.focus();
    } else if (!pattern.test(userId)) {
      alert("영문 + 숫자로 6 ~12글자 이내로 입력해주세요.");
      inputRef.current?.focus();
    } else {
      let result = await idCheck(myUserInfo);
      if (result.isCheck == 1) {
        alert("사용가능한 아이디입니다.");
        setDbIdCheck(true);
      } else {
        alert("중복된 아이디입니다. \n 다시 입력해주세요.");
        setDbIdCheck(false);
        inputRef.current?.focus();
      }
    }
  };
  //아이디 수정 버튼 클릭시
  const handleClear = () => {
    setDbIdCheck(false);
    setMyUserInfo({
      ...myUserInfo,
      userId: "",
    });
    inputRef.current?.focus();
  };
  //계정 생성 버튼클릭시
  const handlePostUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!pwPattern.test(myUserInfo.userPw)) {
      console.log(myUserInfo.userPw);
      alert("영문,숫자,특수문자로 이루어진 6 ~ 16글자 이내로 입력해주세요.");
      setMyUserInfo({
        ...myUserInfo,
        userPw: "",
        userPw2: "",
      });
      inputPwRef.current?.focus();
    } else {
      postUserInfo(myUserInfo);
      alert("아이디를 생성했습니다.");
      setFlag(1);
      setMyUserInfo({
        userId: "",
        userPw: "",
        userPw2: "",
      });
    }
  };

  //로그인 확인 버튼 클릭시
  const goToLogin = async () => {
    let result = await login(loginInfo);
    if (result.code === 1) {
      localStorage.setItem("userId", loginInfo.userId);
      navigate("/");
    } else if (loginInfo.userId == "" || loginInfo.userPw == "") {
      alert("아이디와 비밀번호를 입력해주세요.");
    } else {
      alert("아이디와 비밀번호를 다시 입력해주세요.");
    }
  };
  return (
    <LoginWrap>
      {flag === 0 ? (
        <>
          <SignBox>
            <SignLabel htmlFor="userId">아이디</SignLabel>
            <SignInput
              type="text"
              name="userId"
              id="userId"
              value={userId}
              onChange={(e) => handleChange(e)}
              disabled={dbIdCheck}
              ref={inputRef}
            />
            <span className="id_rule">영문, 숫자로 이루어진 6 ~ 12자</span>
            <button
              type="button"
              className="idCheck"
              onClick={() => handleIdCheck()}
            >
              중복확인
            </button>
            <button
              type="button"
              className="clearBtn"
              onClick={() => handleClear()}
            >
              수정
            </button>
          </SignBox>
          <SignBox>
            <SignLabel htmlFor="userPw">비밀번호</SignLabel>
            <SignInput
              type="password"
              name="userPw"
              id="userPw"
              value={userPw}
              placeholder=""
              onChange={(e) => handleChange(e)}
              ref={inputPwRef}
            />
            <span>영문, 숫자, 특수문자로 이루어진 8 ~ 12자</span>
          </SignBox>
          <SignBox>
            <SignLabel htmlFor="userPw2">비밀번호 확인</SignLabel>
            <SignInput
              type="password"
              name="userPw2"
              id="userPw2"
              value={userPw2}
              onChange={(e) => handleChange(e)}
            />
          </SignBox>
          <SignBox>
            <span
              className={
                userPw2 !== "" && isSame ? "success_txt" : "warning_txt"
              }
            >
              {userPw2 == ""
                ? ""
                : isSame
                ? " 비밀번호가 일치합니다."
                : "비밀번호가 일치하지않습니다."}
            </span>
          </SignBox>
          <SignBox>
            <button
              type="button"
              className="addUserBtn"
              disabled={isVaild ? false : true}
              onClick={(e) => handlePostUser(e)}
            >
              생성
            </button>
          </SignBox>
        </>
      ) : (
        <Row>
          <LoginBox>
            <InputBox className="int-area">
              <LoginInput
                type="text"
                name="userId"
                id="userId"
                value={loginInfo.userId}
                onChange={(e) => loginChange(e)}
                required
              />
              <LoginLabel htmlFor="userId">아이디</LoginLabel>
            </InputBox>
            <InputBox className="int-area">
              <LoginInput
                type="password"
                name="userPw"
                id="userPw"
                value={loginInfo.userPw}
                onChange={(e) => loginChange(e)}
                required
              />
              <LoginLabel htmlFor="userPw">비밀번호</LoginLabel>
            </InputBox>
          </LoginBox>

          <button
            id="Lbtn"
            type="submit"
            className="summitBtn"
            onClick={() => goToLogin()}
          >
            확인
          </button>
        </Row>
      )}
      <InputBox className="btn-area">
        <button
          type="submit"
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
