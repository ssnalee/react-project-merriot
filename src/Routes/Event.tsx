import styled, { keyframes } from "styled-components";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { PiCursorClick } from "react-icons/pi";
import Carousel from "../Common/Carousel";
import { useMediaQuery } from "react-responsive";
import CarouselSec from "../Common/CarouselSec";

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

const SlideDown = keyframes`
  0% {
    transform: translateY(-100%);
    display: block;
  }
  
  100% {
    transform: translateY(0);
  } 
`;
const SlideUp = keyframes`
  0% {
    transform: translateY(0);
  }
  
  100% {
    transform: translateY(-100%);
    display: none;
  }
`;
const EventWrap = styled.div`
  width: 100vw;
  font-family: "Gowun Dodum",serif;
  background: linear-gradient(to right, #fff9f9, #ffe7f2);
`;
const Title = styled.div`
  margin:150px auto 50px;
  width: 550px;
  padding-top:20px;
  h2{
    font-weight: 700;
    font-size:2.2em;
    border-bottom: 2px dotted #e3e3e3;
    background-clip: text;
    background: linear-gradient(to left, #fbcac9, #8ca6ce);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 20px 0;
    text-align: center;
    word-break: keep-all;
    span{
    font-weight: 400;
    font-size:0.7em;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0.5em;
   }
  } 
  h2:hover {
   background: linear-gradient(to left, #fbcac9, #8ca6ce);
    color: #fff;
   -webkit-text-fill-color: #fff;
 }
 p{
    text-align: center;
    padding: 10px 0;
    color:#555555;
 }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    margin:0px auto 30px;
    width: 90%;
    padding-top:50px;
    h2{
    font-size:2em;
   }
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    margin:0px auto 30px;
    width: 90%;
    padding-top:50px;
    h2{
    font-size:1.8em;
      span{
        font-size:0.6em;
      }
    }
  }
`;
const WedCont = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContTitle = styled.div`
  width: 100%;
  padding-top:10px;
  padding-bottom:30px;
  position: relative;
  line-height: 1.5em;
  word-break: keep-all;
  h3{
   font-weight: 700;
   font-size:1.7em;
   line-height: 1.7em;
  }
  .txtCenter{
   text-align: center;
   margin-bottom: 20px;
  }
  img{
   width: 60%;
   position:absolute;
   top:0;
   right:0;
   border-radius: 30px;
  }
  button{
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #fff;
   border: 1px solid transparent;
   border-image: linear-gradient(to right, red 0%, orange 100%);
   border-image-slice: 1;
   cursor: pointer;
   width: 300px;
   height: 50px;
   margin: 0 auto;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
  h3{
   font-size:1.5em;
   line-height: 1.5em;
  }
   img{
   width: 100%;
   position:relative;
   margin: 15px 0;
  }
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    h3{
   font-size:1.2em;
   line-height: 1.2em;
  } 
    img{
   width: 100%;
   position:relative;
   margin: 10px 0;
  }
  button{
   width: 90%;
  }
  }

 `;
const ContDetail = styled.div`
  margin-bottom:80px;
  border-radius: 20px;
  border:4px double #fff;
  overflow: hidden;
  line-height: 2em;
  position: relative;
  img{
    width: 500px;
  }
  p{
    padding:20px;
    font-size: 1.1em;
  }
  display: flex;
  flex-direction: row;
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    img{
      width: 60%;
    }
    p{
      padding:15px;
    }
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    margin-bottom:50px;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 10px;
    img{
    width: 100%;
    }
    p{
    background-color: rgba(255,255,255,0.5);
    line-height: 1.4em;
    }
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    margin-bottom:40px;
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 10px;
    img{
    width: 100%;
    }
    p{
    padding:15px;
    font-size: 1em;
    background-color: rgba(255,255,255,0.5);
    line-height: 1.3em;
    }
  }
`;
const Cont01Ul = styled.ul`
  line-height: 2em;
  width: 75%;
  max-width: 900px;
  margin: 330px auto 100px;
  li{
    font-size: 1.2em;
    margin-bottom: 10px;
    position:relative;
    button{
        background: none;
        border: none;
    }
  }
  li::before{
    position: absolute;
    left: -10px;
    top:7px;
    height: 10px;
    width: 5px;
    content: "";
    border: 1px solid #bcbcbc;
    background-color: #bababa;
  }
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    margin: 220px auto 80px;
    width: 95%;
    li::before{
    top:10px;
    }
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    margin: 0px auto 50px;
    width: 95%;
    line-height: 1.8em;
    li::before{
    top:10px;
    }
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    margin: 0px auto 40px;
    width: 95%;
    line-height: 1.6em;
    li{
      font-size: 1em;
    }
    li::before{
    top:10px;
    }
  }
`;
const ServiceCont = styled(motion.div)`
font-size:0.9em;
  &.slide-fade-in-dropdown {overflow: hidden;}
  &.slide-fade-in-dropdown > p {animation: ${SlideDown} .4s ease;}
  &.slide-fade-out-dropdown {overflow: hidden;}
  &.slide-fade-out-dropdown > p { animation: ${SlideUp} 0.4s ease; animation-fill-mode: forwards;}
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    font-size:0.8em;
  }
`;
const ShowCase = styled.div`
  margin-bottom:50px;
`;

function Event(){
  const isPC = useMediaQuery({
    query : `(min-width:${SIZE_TABLET_V}px)`
  });
  const isMobile = useMediaQuery({
    query : `(max-width:${SIZE_TABLET_V-1}px)`
  });
  const OFF_URL ='https://www.marriott.com/ko/meetings-events/rfp/event-info.mi?erfpSignInOverlay=true';
    const[isServiceShow, SetIsServiceShow] = useState(false);

  return(
    <EventWrap>
      <Title>  
        <h2><span>우리만의 웨딩 데이를 위한 감각적인 디자인</span>웨딩</h2>
        <p>JW 메리어트 호텔 서울의 우아한 웨딩홀에서 꿈의 웨딩을 실현해 보세요.</p>
      </Title>
      <WedCont>
        <ContTitle>
          <h3>01. 웨딩 & 특별행사</h3> 
          <img src={process.env.PUBLIC_URL+'/image/event/evt.avif'} />       
        </ContTitle> 
        <Cont01Ul>
            <li>강남에 소재한 JW 메리어트 호텔 서울의 우아한 웨딩홀에서 로맨틱한 꿈을 현실로 이루어 보세요.</li>
            <li >추가 웨딩 서비스 
                <button onClick={()=>SetIsServiceShow(!isServiceShow)}>{isServiceShow ? <BiChevronUp size={"23px"}/> : <BiChevronDown size={"23px"}/> }</button>
            <ServiceCont className={isServiceShow ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'}>
               <p>준비된 메리어트 공인 웨딩 플래너와 함께 꿈에 그리던 결혼식을 기획해 보세요. 까다로운 교육 과정을 마치고 자격을 갖춘 메리어트 공인 웨딩 플래너와 함께 전통 결혼식이나 군인 결혼식 등 각종 형태의 결혼식을 기획할 수 있습니다. 경험과 교육, 전통, 오랜 시간에 걸쳐 갖추게 된 직관력을 바탕으로 결혼식의 전반적인 부분부터 세세한 항목까지 계획을 세울 수 있을 뿐 아니라, 예산 설정, 메뉴 결정, 테이블 세팅, 플로리스트와 촬영기사, 밴드 섭외, 행사 프로그램 등을 공인 웨딩 플래너와 함께 준비할 수 있습니다.</p> 
            </ServiceCont>   
            </li>
            <li>360명을 수용할 수 있는 넓은 그랜드 볼룸을 갖춘 강남 소재 웨딩홀에서 하객을 맞이해 보세요.</li>
            <li>전문 이벤트 플래너와 경험이 풍부한 케이터링 팀과 함께 서울 한복판에서 특별한 호텔 결혼식을 만들 수 있습니다.</li>
        </Cont01Ul>

      </WedCont>
      <WedCont>
        <ContTitle>
            <h3>02. 요리 전문가와 함께하는 즐거운 미식 체험</h3>
        </ContTitle>
        <ContDetail>
        <img src={process.env.PUBLIC_URL+'/image/event/evt02.jpg'} />
           <p>JW 메리어트 호텔 서울의 웨딩 메뉴는 호텔 요리팀이 최상의 식재료만을 사용하여 디자인하고 만듭니다. <br />서양식과 중식 메뉴 중에서 선택할 수 있으며, 호텔 파티시에가 수작업으로 정성스럽게 만드는 프렌치 스타일의 웨딩 케이크는 진정 잊지 못할 웨딩의 낭만을 더해줍니다.</p></ContDetail>
      </WedCont>
      <WedCont>
        <ContTitle>
            <h3>03. 전문 웨딩 플래너와 함께하는 맞춤형 웨딩 스타일링</h3>
        </ContTitle>
        <ContDetail style={{backgroundColor:'#fef5f5'}}>
        <img src={process.env.PUBLIC_URL+'/image/event/evt03.avif'}/>
            <p>서울에서 특별한 웨딩을 계획하신다면 맞춤 웨딩 테마를 제안해 드리는 메리어트 공인 웨딩 플래너와 상담하세요. <br />선택하신 테마와 완벽하게 어울리는 오감 디자인 웨딩으로 신랑 신부는 물론 하객들도 차원이 다른 웨딩을 경험하실 수 있습니다.
                </p></ContDetail>
      </WedCont>
      <WedCont>
        <ContTitle>
            <h3>04. 웨딩 및 파티 상품 자세히 알아보기</h3>
        </ContTitle>
      
        <ContDetail>
        <img src={process.env.PUBLIC_URL+'/image/event/evt04.avif'} />
        <p>선호하시는 분위기와 스타일을 연출할 수 있도록 이상적인 100% 맞춤식 웨딩 및 파티 상품을 제안해 드립니다.</p></ContDetail>
      </WedCont>
      <WedCont>
        <ContTitle>
            <h3 className="txtCenter">이색 테마 웨딩 쇼케이스</h3>
            <p className="txtCenter">오감을 자극하는 창의적인 테마를 선택하여 잊지 못할 낭만적인 웨딩을 계획해 보세요. <br />
               계절별 웨딩 쇼케이스 중 하나인 특별 예식을 미리 살펴보세요.</p>
        </ContTitle>
        <ShowCase>
         <Carousel />
       </ShowCase>
      </WedCont>
      <WedCont>
        <ContTitle>
            <h3 className="txtCenter">JW웨딩홀</h3>
        </ContTitle>
        <CarouselSec />  
      </WedCont>
      <WedCont>
        <ContTitle>
            <h3 className="txtCenter">JW 메리어트 호텔 서울과 함께 웨딩을 계획하세요.</h3>
            <p className="txtCenter">고객님이 꿈꾸시는 웨딩에 대해 말씀해 주세요.<br /> 저희가 연락드리고 함께 상의하여 꿈의 웨딩을 기획해 드립니다.</p>
            <button onClick={() => window.open(OFF_URL)}>여기에서 시작하기<PiCursorClick size={"25px"} /></button>
        </ContTitle>
      </WedCont>
    </EventWrap>
  );
}

export default Event;