import styled from "styled-components";
import Slider from "../Common/Slider";

const RoomWrap = styled.div`
  width: 100%;
`;

const Title = styled.div`
  margin:150px auto 50px;
  width: 550px;
  padding-top:20px;
  h2{
    font-weight: 700;
    font-size:2.2em;
    border-bottom: 2px dotted #e3e3e3;
    span{
    font-weight: 400;
    font-size:0.7em;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0.5em;
   }
  }
`;
const Tabs = styled.ul``;
const Tab = styled.li``;

const ImageSliderBox = styled.div`
  width: 100%;
`;
const ImageSliders = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ImageSlider = styled.li``;

export interface IRoomsProps {
    roomName : string;
    roomImages : string[]
  }
function Room(){
  const rooms : Array<IRoomsProps> = [
    { 
      roomName : '게스트룸1',
      roomImages : ['gr1_01.webp','gr1_02.avif','gr1_03.webp','gr1_04.avif','gr1_05.avif','gr1_06.webp']
    },
    { 
      roomName : '게스트룸2',
      roomImages : ['gr2_01.webp','gr2_02.avif','gr2_03.avif']
    },
    { 
      roomName : '스위트룸1',
      roomImages : ['sw1_01.webp','sw1_02.avif','sw1_03.avif']
    },
    { 
      roomName : '스위트룸2(대형)',
      roomImages : ['sw2_01.avif','sw2_02.webp','sw2_03.avif','sw2_04.avif']
    },
    { 
      roomName : '스위트룸3(대형)',
      roomImages : ['sw3_01.webp','sw3_02.avif','sw3_03.avif','sw3_04.avif']
    },
    { 
      roomName : '스위트룸4',
      roomImages : ['sw4_01.avif','sw4_02.webp','sw4_03.avif','sw4_04.avif']
    },
    { 
      roomName : '비즈니스 스위트',
      roomImages : ['bs_01.webp','bs_02.avif','bs_03.avif','bs_04.avif']
    },
    { 
      roomName : '프레지덴셜 펜트하우스',
      roomImages : ['pr_01.avif','pr_02.PNG','pr_03.PNG']
    },
    { 
      roomName : '엠베서더 펜트하우스',
      roomImages : ['em_01.avif','em_02.PNG']
    },
  ];


  return(
    <RoomWrap>
      <Title>
        <h2>객실</h2>
        <p>JW 메리어트 호텔 서울은 펜트하우스 2개와 스위트 32개를 포함하여 총 376개의 객실을 갖추고 있으며, 모든 객실과 스위트, 펜트하우스에서 눈부신 서울 도심 전망을 만끽하실 수 있습니다. 한국 전통의 느낌과 현대적인 감각이 우아한 조화를 이루는 인테리어와 넓은 침실과 욕실, 객실 창가에 놓인 아늑한 소파는 온전한 휴식과 숙면을 즐길 수 있는 완벽한 힐링의 시간을 선사합니다. 호텔 최상층에 위치한 프레지덴셜 펜트하우스와 앰배서더 펜트하우스는 복층 구조로 설계되어 차원이 다른 서울 전망과 한강 뷰를 선사합니다. 전용 엘리베이터를 비롯해 유명 아티스트의 미술 작품과 세심한 안목으로 선별한 고급 장식품, 뱅앤올룹슨 프리미엄 사운드 시스템 등 최고급 어메니티로 채워진 펜트하우스에서 럭셔리 그 자체를 경험하실 수 있습니다.</p>
      </Title>
      <Tabs>
        {rooms.map((room)=>(<Tab>{room.roomName}</Tab>))}
      </Tabs>
      <ImageSliders>
        {rooms.map((r,i)=>(
          <ImageSlider key={i}>
            <h4>{r.roomName}</h4>
                <Slider roomImages ={r.roomImages}></Slider>
          {/* {rooms[i].roomImages.map((d)=>(
            <SliderLi> <Image src={process.env.PUBLIC_URL+'/image/room/'+d}></Image></SliderLi> 
          ))} */}
         </ImageSlider>
        ))}
      </ImageSliders>
      
    </RoomWrap>
  );
}

export default Room;