import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { NextTo, Prev } from './Common';

interface Props {
    src : string;
}
const SliderList = styled.div<Props>`
  background: ${props => `url(${process.env.PUBLIC_URL}/image/event/${props.src}) center center no-repeat`};
  background-size: cover;
  position: relative;
  height:500px;
  p{
    font-size:2em;
    color:#fff;
    padding:10px;
    text-shadow: -1px 0px #000, 0px 1px #000, 1px 0px #000, 0px -1px #000;
  }
`;
interface IFix{
  [x: string]: any;
  currentSlide?: any;
  slideCount?: any;
  children?: any;
}
const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }: IFix) =>(
  <span {...props}>{children}</span>
);
const Carousel = () => {
    const settings = {
      dots : true,
      Infinity : true,
      speed : 500,
      slidesToShow: 1,
      // centerMode:true,
      responsive: [ 
      {
          breakpoint: 480,
            settings: {
              dots:false,
        }
      }]
    //   nextArrow: (			
    //   <SlickButtonFix>
    //     <NextTo />
    //   </SlickButtonFix>
    // ),
    // prevArrow: (			
    //   <SlickButtonFix>
    //     <Prev />
    //   </SlickButtonFix>
    // )
    }
    return (
        <div className="carousel">
            <Slider {...settings}>
              <SliderList src='season01.avif'><p>봄</p></SliderList>
              <SliderList src='season02.jpg'><p>여름</p></SliderList>
              <SliderList src='season03.jpg'><p>가을</p></SliderList>
              <SliderList src='season04.avif'><p>겨울</p></SliderList>
            </Slider>
        </div>

    );
}

export default Carousel;