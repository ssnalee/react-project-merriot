import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { NextTo, Prev } from './Common';

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

// const List02TypeBox = styled.ul`
//   display: flex;
//   justify-content: center;
// `;
const List02Type = styled.div`
  width:33%;
  background-color: #fff;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 30px;
  margin : 0 10px 30px;
  img{
    width: 100%;
  }
  h4{
    font-size: 1.2em;
    text-align: center;
    padding:20px 0;
    color: #f79090;
    font-weight: 700;
    display: flex;
    align-items: center;
    flex-basis: 100%;
    &::after{
      content: "········";
      flex-grow: 1;
    }
    &::before{
      content: "········";
      flex-grow: 1;
    }
  }
  p{
    padding: 20px;
    line-height: 1.4em;
  }
  /* 노트북 & 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_H}px) and (max-width: ${SIZE_PC-1}px){
    
  }
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
    h4{
      &::after{
        content: "·····";
      }
      &::before{
        content: "······";
      }
    }
    p{
    padding: 10px;
    line-height: 1.4em;
  }

  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    h4{
    font-size: 1.1em;
      &::after{
        content: "····";
      }
      &::before{
        content: "····";
      }
    }
    p{
    padding: 10px;
    line-height: 1.3em;
    }
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    h4{
    font-size: 1em;
      &::after{
        content: "···";
      }
      &::before{
        content: "···";
      }
    }
    p{
    padding: 10px;
    line-height: 1.1em;
    }

  }
`;

const CarouselSec = () => {
  const settings = {
    speed : 500,
    slidesToShow: 3,
    draggable: false,
    arrows: false,    
    responsive: [ 
      {
          breakpoint: SIZE_TABLET_H,
            settings: {
              arrows:true,
              draggable: true,
              slidesToShow: 1,
              centerMode:true,
              centerPadding: '20%',
        }
      },
      {
        breakpoint: SIZE_MOBILE,
          settings: {
            arrows:true,
            draggable: true,
            slidesToShow: 1,
            centerMode:true,
            centerPadding: '10%',
      }
    },
    
    ]
  }
  return (
      <div className="carousel">
          <Slider {...settings}>
 
          <List02Type>
            <img src={process.env.PUBLIC_URL+"/image/event/jw01.jpg"} />
            <h4>그랜드 볼룸</h4>
            <p>그랜드 볼룸은 7m 높이 층고와 21m 길이 통로로 설계되어 웅장함과 동시에 감탄을 자아냅니다. 5층 전층이 그랜드 볼룸으로 프라이빗한 웨딩이 가능합니다.</p>
          </List02Type>
          <List02Type>
            <img src={process.env.PUBLIC_URL+"/image/event/jw02.jpg"} />
            <h4>살롱</h4>
            <p>3층에 위치한 6개의 살롱은 스몰 웨딩, 애프터 파티를 열기에 좋습니다.</p>
          </List02Type>
          <List02Type>
            <img src={process.env.PUBLIC_URL+"/image/event/jw03.avif"} />
            <h4>브라이덜 룸</h4>
            <p>따뜻한 색상을 바탕으로 은은한 조명과 심플하면서도 우아한 인테리어가 특징인 신부대기실은 웨딩의 주인공인 신부를 더욱 돋보이게 합니다. 모니터를 통해 그랜드 볼룸의 진행 상황을 생중계하고, 대기실 내 파우더룸과 화장실을 갖추어 프라이버시와 편의성을 높였습니다.</p>
            </List02Type>
          </Slider>
      </div>

  );
}

export default CarouselSec;