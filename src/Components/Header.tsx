import { Link, useNavigate , useMatch, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion, useAnimation , useScroll} from "framer-motion";
import ReactStars from "react-stars";
import Modal from "./Modal";
import { useMediaQuery } from "react-responsive";
import {MdOutlineClose} from 'react-icons/md';
import { TfiMenuAlt } from "react-icons/tfi";

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

interface HeaderProps {
  isNavShow : boolean;
}
const Nav = styled(motion.nav)`
  position : fixed;
  display: flex;
  justify-content : space-between;
  align-items :center;
  width : 100%;
  height : 150px;
  top : 0;
  border-bottom : 1px solid #000;
  padding : 20px 50px;
  z-index : 99;
  img{
    width : 150px;  
  }
  font-size: 1em;
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
   padding : 10px 30px; 
   font-size: 0.8em;
   img{
      width : 80px;  
    }   
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    font-size:1em;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    font-size: 0.8em;
  }
`;
const Logo = styled.img`    
  width: 100px;
  position: fixed;
  left: 30px;
  top:30px;
`;
const NavBtn = styled.button`
   position: fixed;
   right: 30px;
   top:30px;
   background-color: transparent;
   border:none;
   z-index: 999;
`;
const MobileNav = styled(motion.nav)<HeaderProps>`
  position: fixed;
  z-index: 100;
  display: flex;
  right: ${props=>props.isNavShow ? '0': '-600px'};
  width: 60vw;
  min-width:250px;
  height: 100vh;
  background-color: #fff;
  flex-direction: column;
`;
  
const NavLists = styled.ul`
  display : flex;
  align-items : center;
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    height: 100%;
    flex-direction: column;
    border-bottom: 1px solid #999;
    margin-top:100px;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE-1}px){
    height: 100%;
    flex-direction: column;
    border-bottom: 1px solid #999;
    margin-top:80px;
  }
`;
const NavList = styled.li`
  margin-right: 15px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
    /* 테블릿 가로 */
    @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H-1}px){
      margin-right: 10px;
   }
    /* 모바일 가로 & 테블릿 세로 */
    @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
    margin-bottom: 15px;
   }
   /* 모바일 세로 */
   @media only all and (max-width: ${SIZE_MOBILE-1}px){
    margin-bottom: 12px;
   }
  
`;
const ListBar = styled(motion.span)`
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 5px;
    bottom: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: #999;
`;
const Review = styled.div`
  display: flex;
  align-items: center;
  .rating {
    margin-top : -4px; 
    margin-right: 5px;
  }
  .ratingValue{
    cursor: pointer;
  }
/* 모바일 가로 & 테블릿 세로 */
@media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V-1}px){
  height: 100px;
  margin : 0 auto;
}
/* 모바일 세로 */
@media only all and (max-width: ${SIZE_MOBILE-1}px){
  height: 100px;
  margin : 0 auto;
}
`;

const navVariants = {
  top : {
    backgroundColor:"rgba(255,255,255,1)",
    color : "#000"
    
      
  },
  scroll : {
    backgroundColor :"rgba(0,0,0,0.6)",
    backdropFilter : 'blur(5px)',
    // backgroundColor:"rgba(0,0,0,1)",
    color : "#fff"
  }
}
const mobileNavVariants = {
  open : {
    right: 0,
    transition: {duration : 0.5,}
  },
  close : {
    right:'-600px',
    transition: {duration : 0.5,}
  }
}
export interface IReviews{
  id : number;
  username: string;
  date : number;
  title : string;
  overview : string;
  star : number;
}

function Header(){
  const navigate = useNavigate ();
  const homeMatch = useMatch("/");
  const galleryMatch = useMatch("/gallery");
  const roomMatch = useMatch("/room");
  const diningMatch = useMatch("/dining");
  const experienceMatch = useMatch("/experience");
  const eventMatch = useMatch("/event");
  const navAnimation = useAnimation();
  const mobileAnimation = useAnimation();
  const {scrollY} = useScroll();
  const reviewMatch = useMatch(`/review`);
  const isPC = useMediaQuery({
    query : `(min-width:${SIZE_TABLET_V}px)`
  });
  const isMobile = useMediaQuery({
    query : `(max-width:${SIZE_TABLET_V-1}px)`
  });

  const [isNavShow,setIsNavShow] = useState(false);
  useEffect(()=>{
        if(isNavShow == true){
          mobileAnimation.start("open" );
        } else {
          mobileAnimation.start("close");
        }
},[isNavShow, mobileAnimation]);
  useEffect(()=>{
    scrollY.onChange(()=>{
        if(scrollY.get() >50){
            navAnimation.start("scroll" );
        } else{
            navAnimation.start("top");
        }
    });
},[scrollY, navAnimation]);

  const reviewClick = () => {
    navigate('/review');
  }

  const reviewList : Array<IReviews> = [
    {id : 0,
    username : "Jsae06",
    date : 20240105,
    title : "JW Seoul",
    overview : "This hotel embodies the luxury line of Marriott hotels. The service staff were extremely respectful and attentive. No luxury Marriott hotel I’ve stayed at in the US comes close to what you’ll experience here in terms of service.",
    star : 5,
    },
    {id : 1,
        username : "Ed",
        date : 20240103,
        title : "Treated like a top end customer",
        overview : "Excellent stay and manager night shift female I didn’t get her name but she took me around and let me view the suites before choosing one was an awesome gesture of a manger who cares about customers.",
        star : 5,
    },
    {id : 2,
        username : "Eunice Park",
        date : 20240101,
        title : "Best service you can get at a 5 star hotel!",
        overview : "I've stayed at quite a bit of Marriott hotels all over the US. But experiences at JW Marriott Seoul is by far the best. First, losing the passport abroad is a frightening experience while traveling with my family. But the hotel staff, Kyrie Cho worked swiftly and effectively to find it in one of the three possible shops that could've had the passport and delivered it in the fastest possible way to the airport in time for our travel back to the US. This is not at all expected and I was really shocked at the level of dedication and service JW Marriott provided. I have returned to Korea and extended my stay at this hotel due to this extremely positive, heart-warming experience. I recommend highly to check out this hotel.",
        star : 5,
    },
    {id : 3,
        username : "Myeong Jackson",
        date : 20231229,
        title : "Excellent foods and environment",
        overview : "We love foods at Marriott!",
        star : 5,
    },
    {id : 4,
        username : "Andy",
        date : 20231226,
        title : "Never Choose JW Marriott Hotel Seoul",
        overview : "As a platinum Marriott member, this hotel is very much not recommended by me. 1. The hotel signage is particularly inconspicuous, and it's very difficult to find the check in place, whether you're coming from the shopping mall or directly from the main entrance; 2. The hotel's rooms are small in the hallways, and the hygiene is organized in a very poor way; 3. The hotel front desk is very annoying, and will bother you time and time again, and doesn't care at all about the customer's feelings;4.All kinds of requirements and restrictions, such as Happy hour can only be one hour, so on and so forth, sorry to have been to a lot of countries for the first time in Korea have this treatment. You can try some other hotels in Korea, but don't come back to this hotel.",
        star : 1,
    },
    {id : 5,
        username : "Amelie",
        date : 20231221,
        title : "Must try this hotel if you are planning to be in Seoul",
        overview : "Been staying in this hotel for many years and it’s always clean and excellent service.",
        star : 5,
    },
    {id : 6,
        username : "Jsae06",
        date : 20231208,
        title : "Great hotel",
        overview : "It’s always a pleasure staying the the Marriott Seoul. Wonderful hotel and very kind staff.",
        star : 5,
    },
]
  let voteValue = Number((reviewList.map(review=>review.star).reduce((prev,curr)=>prev+curr,0) /reviewList.length).toFixed(1));

  return(
    <>
     { isPC && 
        <Nav
          variants={navVariants}
          animate={navAnimation}
          initial={"top"}
        >
      <img src={process.env.PUBLIC_URL+'/image/logo.webp'} alt="fairfield by merriott" />
      <NavLists >
        <NavList>
          <Link to="/">소개
            {homeMatch ? <ListBar layoutId="listBar" /> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/gallery">갤러리
            {galleryMatch ? <ListBar layoutId="listBar" /> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/room">객실 & 스위트
            {roomMatch ? <ListBar layoutId="listBar" /> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/dining">다이닝
            {diningMatch ? <ListBar layoutId="listBar" /> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/experience">익스피리언스
            {experienceMatch ? <ListBar layoutId="listBar" /> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/event">웨딩
            {eventMatch ? <ListBar layoutId="listBar" /> : null}
          </Link>
        </NavList>
      </NavLists>
      <Review>
        <ReactStars
          count={5}
          value={voteValue}
          color1="#E6E6E6"
          color2="#FFCC33"
          half
          size={20}
          edit={false}
          className="rating"
        />
        <span className="ratingValue" onClick={reviewClick} >({voteValue}점)</span>
        {reviewMatch ? (
          <AnimatePresence>
            <Modal title = "review" reviewList={reviewList}/>
          </AnimatePresence>  
        ) : null}
      </Review>     
  </Nav>
}   


{isMobile && 
<>
  <Logo src={process.env.PUBLIC_URL+'/image/logo_W.png'} alt="fairfield by merriott" />
  <NavBtn className = "navBtn" onClick={()=>setIsNavShow(!isNavShow)}>
    {
      isNavShow ? <MdOutlineClose size={"23px"}/> : <TfiMenuAlt size={"23px"}/>
    }
  </NavBtn>

    <MobileNav isNavShow={isNavShow}
        variants={mobileNavVariants}
        animate={mobileAnimation}
        initial={"close"}
        >
      <NavLists>
        <NavList>
          <Link to="/">소개
            {homeMatch ? <ListBar/> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/gallery">갤러리
            {galleryMatch ? <ListBar/> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/room">객실 & 스위트
            {roomMatch ? <ListBar /> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/dining">다이닝
            {diningMatch ? <ListBar/> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/experience">익스피리언스
            {experienceMatch ? <ListBar/> : null}
          </Link>
        </NavList>
        <NavList>
          <Link to="/event">웨딩
            {eventMatch ? <ListBar /> : null}
          </Link>
        </NavList>
      </NavLists>
      <Review>
        <ReactStars
          count={5}
          value={voteValue}
          color1="#E6E6E6"
          color2="#FFCC33"
          half
          size={20}
          edit={false}
          className="rating"
        />
        <span className="ratingValue" onClick={reviewClick} >({voteValue}점)</span>
        {reviewMatch ? (
          <AnimatePresence>
            <Modal title = "review" reviewList={reviewList}/>
          </AnimatePresence>  
        ) : null}
      </Review>
    </MobileNav>      

  </>
    
   }
   </>
  );
}

export default Header;