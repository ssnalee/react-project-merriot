import { useState, useEffect, useRef} from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { IRoomsProps } from "../Routes/Room";

const Wrapper = styled(motion.div)`
  position: relative;
  min-height: 300px;
  max-width: 500px;
  width: 50%;
  margin-top: 30px;
  margin: 0 auto;
  overflow: hidden;
  :hover .arrow {
    opacity: 1;
  }
`;

const ArrowBtn = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  transition: all 0.3s;
  z-index: 90;
  cursor: pointer;
  &:hover {
    color: #000;
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:blur {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }
  svg {
    width: 40px;
    height: 40px;
  }
`;

const LeftArrowBtn = styled(ArrowBtn)`
  left: 0;
`;

const RightArrowBtn = styled(ArrowBtn)`
  right: 0;
`;

const Row = styled(motion.div)<{ gridcnt: number; totalImg : number; }>`
  position: absolute;
  left: 0;
  width: calc(100% * ${(props) => props.totalImg});

  display : flex;
  flex-direction : row;
  justify-content : center;
  &:after {
    content: "";
    display: block;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string; offset: number }>`
  display: block;
  position : relative;
  width: calc(100% / ${(props) => props.offset});
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  /* & ~ & {
    margin : 0 5px;
  }
  &:first-child {
    transform-origin: center left;
    margin : 0;
  }
  &:last-child {
    transform-origin: center right;
    margin : 0;
  } */
 
`;
const Img =styled.img`
  width: 100%;
  object-fit: cover;

`;
const Info = styled(motion.div)`
  position: absolute;
  bottom : 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0,0,0,0.7);
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 20px;
  }
`;
const rowVariants = {
    hidden : (right : number) => {
        return {
            x : right === 1 ? window.innerWidth + 5 : -window.innerWidth - 5,
        }
    },
    visible : {
        x : 0,
        y : 0
    },
    exit : (right : number) => {
        return {
            x : right === 1 ? -window.innerWidth - 5 : window.innerWidth + 5,
        }
    },
}
// const boxVariants = {
//     normal : {
//         scale : 1,
//     },
//     hover : {
//         zIndex : 99,
//         scale : 1.2,
//         y : 0,
//         transition : {
//             delay :0.5,
//             duration : 0.3,
//             type : "tween"
//         }
//     }
// }
// const infoVariants= {
//     hover : {
//         opacity : 1,
//         transition : {
//             delay :0.5,
//             duration : 0.3,
//             type : "tween"
//         }
//     },
// }
interface ISlider{
    title : string;
    listType : string;
    mediaType : string;
    menuName : string;
}
// function Slider({

//     return(
//         <Wrapper>
//             <Title>{title}</Title>

//         </Wrapper>
//     )
// }

// export default Slider;
interface ISlideProps{
    roomImages : string[];
}
function Slider({roomImages}:ISlideProps){
    const offset = 1; //보여주고 싶은 영화의 수
    const [isRight, setIsRight] = useState(1); // left: -1, right: 1
    const [index,setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = (v : boolean) => {
        setLeaving(v);
    }
    const totalImg = roomImages.length;
    const changeIndex = (right : number) => {
        if (leaving) return;
        if (roomImages){
            toggleLeaving(true);
            setIsRight(right);
            right === 1 ?
            setIndex((prev)=>(prev >= totalImg ? 0 : prev+1)) :
            setIndex((prev)=>(prev === 0 ? totalImg : prev-1));
        }
    }
    useEffect(()=>{
        if(roomImages){
            const totalLength =  roomImages.length;
            const maxIndex = 
              totalLength % offset === 0 ? 
              Math.floor(totalLength / offset) - 1 :
              Math.floor(totalLength / offset);
            if(index > maxIndex){
                setIndex(maxIndex);
            }
        }
    },[offset,roomImages,index,setIndex]);
    // row Props
    const rowProps = { 
        gridcnt : offset,
        custom : isRight,
        variants : rowVariants,
        initial : "hidden",
        animate : "visible",
        exit : "exit",
        key : index,
        transition : { type:"tween" ,duration : 1,}
    }
    const onClickArrowBtn = (right : number) => {
        if(!leaving){
            changeIndex(right);
        }
    }
  return (
    <Wrapper>
  
                 <LeftArrowBtn
                className="arrow"
                onClick={() => onClickArrowBtn(-1)}
            >
                <AiOutlineLeft />
            </LeftArrowBtn>
            <RightArrowBtn
                className="arrow"
                onClick={() => onClickArrowBtn(1)}
            >
                <AiOutlineRight />
            </RightArrowBtn>
            <AnimatePresence
                initial={false}
                onExitComplete={() => toggleLeaving(false)}
                custom={isRight}
            >
                <Row totalImg = {totalImg}
                  {...rowProps}
                  {...{}}             
                >
                        
                {roomImages.map((img)=> (
                 <Box bgphoto ={img} offset={offset}>   <Img src={process.env.PUBLIC_URL+'/image/room/'+ img} /></Box>
                
      
                 ))}  


                      {/* {data?.results
            .slice(offset * index, offset * index + offset)
            .map((d) => (
              // <Box
              //   key={d.id}
              //   variants={boxVariants}
              //   initial="normal"
              //   whileHover="hover"
              //   transition={{ type: "tween" }}
              //   offset={offset}
              // >
              //   <Info variants={infoVariants}>
              //     <h4>{d.title ?  d.title : d.name}</h4>
              //   </Info>
              //</Box>
            ))} */}
                </Row>
            </AnimatePresence>


    </Wrapper>
    
        
  );
}
export default Slider;