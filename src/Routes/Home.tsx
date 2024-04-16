import { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useScrollFadeIn from "../hooks/useScrollFadeIn";

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

interface Props {
  src : string;
}

const Part = styled.div<Props>`
  width: 100%;
  height: 100vh;
  background: ${props => `url(${process.env.PUBLIC_URL}/image/home/${props.src}) center center no-repeat`};
  background-size: cover;
  position: relative;
  

  /* 노트북 & 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_H}px) and (max-width: ${SIZE_PC-1}px){
    
  }
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){

  }
`;

const Cont01 =  styled.div`
  width: 40%;
  height: 100%;
  min-width: 540px;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  right: 20%;
  top:0;
  color: #fff;
  padding: 2em;
  clear: both;
  & .weddingBtn{
    background-color:#e4b8b8;
  }
    /* 노트북 & 테블릿 가로 */
    @media only all and (min-width: ${SIZE_TABLET_H}px) and (max-width: ${SIZE_PC-1}px){
      
  }
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    min-width: 90%;
    right:0;
    height:50%;
    top:35%;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    min-width:100%;
    height:50%;
    right:0;
    top:30%;
    background-color: rgba(255,255,255,0.6);
    color:#000;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    min-width:100%;
    height:50%;
    right:0;
    top:30%;
    background-color: rgba(255,255,255,0.6);
    color:#000;

    &.firstCont{
      width: 100%;
      height:100vh;
      top:25%;
      background-color:transparent;
      color:#f2f1f1;
      padding:1em;
      text-shadow: 0px 0px 10px #4f4f4f;
    }
    
  }
`;
const Cont02 = styled(Cont01)`
  left:10%;
  clear: both;
    /* 노트북 & 테블릿 가로 */
    @media only all and (min-width: ${SIZE_TABLET_H}px) and (max-width: ${SIZE_PC-1}px){
    
  }
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    left:0;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    left : 0;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    left : 0;
  }
`;
const ContTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
  font-family: "Gowun Dodum",serif;
  font-size:400;
  margin-top: 55%;
    /* 노트북 & 테블릿 가로 */
    @media only all and (min-width: ${SIZE_TABLET_H}px) and (max-width: ${SIZE_PC-1}px){
    
  }
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    margin-top: 10%;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    margin-top: 10%;
    font-size:1.8em;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    margin-top: 10%;
    font-size:1.5em;
  }
`;
const ContDetail = styled.p`
  font-size:  1em;
  line-height: 1.5em;
  font-family: 'Nanum Gothic Coding',serif;
    /* 모바일 가로 & 테블릿 세로 */
    @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    font-weight: 600;
    line-height: 1.3em;
  }
    /* 모바일 세로 */
    @media only all and (max-width: ${SIZE_MOBILE-1}px){
    font-weight: 600;
    font-size:0.9em;
    line-height: 1.2em;
  }
`;
const DetailBtn = styled.button`
  width: 200px;
  height: 60px;
  border: 1px solid #929292;
  background-color: #fff6f6;
  border-radius: 50px;
  font-size: 1em;
  margin: 20px 30px 0;
  float: right;
  cursor: pointer;
    /* 모바일 가로 & 테블릿 세로 */
    @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
      background-color: #000;
      color:#fff;
  }
    /* 모바일 세로 */
    @media only all and (max-width: ${SIZE_MOBILE-1}px){
      background-color: #000;
      color:#fff;
      width: 150px;
      height: 50px;
      font-size: 0.9em;
      margin: 10px 20px 0;
  }
`;
const DetailBtn2 =styled(DetailBtn)`
 float: left;
 margin: 20px 0 0;
`;
function Home (){
  // const animatedItem  = useScrollFadeIn('up',1,1);

return (
  <>
    <Part src='sec01.jpg' className="firstPart">
      <Cont01 className="firstCont">
        <ContTitle>서울 5성급 특급 호텔에 걸맞은 품격을 누려보세요.</ContTitle>
        <ContDetail>유명 관광지와 가까운 강남 소재 JW 메리어트 호텔 서울은 5성급 호텔 경험을 제공하는 특급 호텔입니다. 펜트하우스 2실과 스위트 32실 포함, 총 379개의 객실을 보유하고 있으며 JW 메리어트 호텔 서울만의 세련된 시그니처 어메니티와 고급 침구, 매력적인 서울 도심 전망을 갖춘 객실에서 현대적인 럭셔리를 만끽하며 아늑하게 휴식을 취하실 수 있습니다. 활기 넘치는 서울 강남에서 호캉스를 계획하신다면, JW 메리어트 호텔 서울에서 기억에 남는 경험을 만들어 보세요.</ContDetail>
      </Cont01>
    </Part>
    <Part src='sec02.jpg'>
      <Cont02>
        <ContTitle>고급 다이닝 레스토랑</ContTitle>
        <ContDetail>세계 유명 셰프는 물론 식음료 전문가와 컨설턴트가 빚어 내는 세련된 오뜨 퀴진(haute cuisine)으로 황홀한 고급 다이닝의 세계를 경험해 보세요.
        </ContDetail>
        <Link to="/dining">
          <DetailBtn>자세히보기 &gt;</DetailBtn>
        </Link>
      </Cont02>
    </Part >
    <Part src='sec03.webp'>
      <Cont01>
        <ContTitle>마음챙김을 경험하는 시간 </ContTitle>
        <ContDetail>
        마르퀴스 피트니스 클럽은 도시 생활의 번잡함에서 벗어나 완벽한 웰니스 라이프스타일을 경험할 수 있는 오아시스입니다.<br />
        몸과 마음, 정신의 치유를 통해 새로운 에너지를 불어넣을 수 있는 건강한 휴식과 재충전을 누려보세요.</ContDetail>
        <Link to="/experience">
          <DetailBtn>자세히보기 &gt;</DetailBtn>
        </Link>
      </Cont01>
    </Part >
    <Part src='sec04.webp'>
      <Cont02>
        <ContTitle>프레지덴셜 펜트하우스 - 거실 공간</ContTitle>
        <ContDetail>프레지덴셜 펜트하우스에서 서울의 매력에 흠뻑 빠지는 럭셔리를 경험하세요. 그림 같은 한강 뷰와 남산 뷰 등 다채로운 서울 도심 전망을 만끽하실 수 있습니다.
        </ContDetail>
        <Link to="/room">
          <DetailBtn2>자세히보기 &gt;</DetailBtn2>
        </Link>
        
      </Cont02>
    </Part >
    <Part src='sec05.webp'>
      <Cont01>
        <ContTitle>꿈의 웨딩이 실현되는 곳</ContTitle>
        <ContDetail>JW 메리어트 호텔 서울의 우아한 웨딩홀과 전문 이벤트 플래너, 맞춤 케이터링 메뉴, 개인 맞춤 패키지를 최대 활용하고 세상 가장 특별한 웨딩 데이를 맞이하세요.</ContDetail>
        <Link to="/event">
          <DetailBtn2 className="weddingBtn">자세히보기 &gt;</DetailBtn2>
        </Link>
      </Cont01>
    </Part>
    <Part src='sec06.webp'>
      <Cont02>
        <ContTitle>이그제큐티브 라운지</ContTitle>
        <ContDetail>이그제큐티브 객실 투숙객을 위한 전용 공간에서 평온하고 럭셔리한 휴식을 즐겨보세요. 빠른 체크인/체크아웃과 식음료, 비즈니스 서비스 혜택을 이용하실 수 있습니다. 다이닝으로 건강한 메뉴로 구성된 조식과 이브닝 오브되브르를 제공합니다. 9층에서 만나보실 수 있습니다.
        </ContDetail>
      </Cont02>
    </Part>
    <Part src='sec07.webp'>
      <Cont01>
        <ContTitle>비즈니스 센터</ContTitle>
        <ContDetail>인터넷과 기본적인 비즈니스 서비스를 다양하게 갖춘 비즈니스 센터에서 투숙 중 원활하게 업무를 처리하세요. 인터넷 연결 데스크탑 PC와 팩스, 프린터, 전용 미팅룸 3실 등 최신 어메니티와 서비스를 제공해 외국인 바이어와의 비즈니스 미팅을 매끄럽고 효율적으로 진행하실 수 있습니다.이그제큐티브 라운지 내 위치해 있습니다.</ContDetail>
      </Cont01>
    </Part>
    <Part src='sec08.jpg'>
      <Cont02>
        <ContTitle>컨시어지</ContTitle>
        <ContDetail>현지 여행 정보를 꿰뚫고 있는 직원이 인근 관광지 투어나 액티비티 일정을 제안해 드릴 수 있습니다. 이동 수단을 원하시면 필요하신 사항을 세심하게 파악해 교통편을 주선해 드립니다. 아울러, 호텔 인근 및 서울 명소로 각광받는 시장이나 쇼핑가, 고급 레스토랑도 기꺼이 추천해 드립니다.
        </ContDetail>
      </Cont02>
    </Part>

  </>

);
}

export default Home;
