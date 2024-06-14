import { Link, useNavigate, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useScroll,
} from "framer-motion";
import ReactStars from "react-stars";
import Modal from "./Modal";
import { getReviews, IReviewList } from "./../Routes/api";
import { useMediaQuery } from "react-responsive";
import { MdOutlineClose } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { useQuery } from "react-query";

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

interface HeaderProps {
  isNavShow: boolean;
}
const Nav = styled(motion.nav)`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  top: 0;
  border-bottom: 1px solid #000;
  padding: 20px 50px;
  z-index: 99;
  img {
    width: 150px;
  }
  font-size: 1em;
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H -
    1}px) {
    padding: 10px 30px;
    font-size: 0.8em;
    img {
      width: 80px;
    }
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -
    1}px) {
    font-size: 1em;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    font-size: 0.8em;
  }
`;
const Logo = styled.img`
  width: 100px;
  position: fixed;
  left: 30px;
  top: 30px;
`;
const NavBtn = styled.button`
  position: fixed;
  right: 30px;
  top: 30px;
  background-color: transparent;
  border: none;
  z-index: 999;
`;
const MobileNav = styled(motion.nav)<HeaderProps>`
  position: fixed;
  z-index: 100;
  display: flex;
  right: ${(props) => (props.isNavShow ? "0" : "-600px")};
  width: 60vw;
  min-width: 250px;
  height: 100vh;
  background-color: #fff;
  flex-direction: column;
`;

const NavLists = styled.ul`
  display: flex;
  align-items: center;
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -
    1}px) {
    height: 100%;
    flex-direction: column;
    border-bottom: 1px solid #999;
    margin-top: 100px;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    height: 100%;
    flex-direction: column;
    border-bottom: 1px solid #999;
    margin-top: 80px;
  }
`;
const NavList = styled.li`
  margin-right: 15px;
  padding: 5px;
  box-sizing: border-box;
  position: relative;
  /* 테블릿 가로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) and (max-width: ${SIZE_TABLET_H -
    1}px) {
    margin-right: 10px;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -
    1}px) {
    margin-bottom: 15px;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
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
    margin-top: -4px;
    margin-right: 5px;
  }
  .ratingValue {
    cursor: pointer;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -
    1}px) {
    height: 100px;
    margin: 0 auto;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    height: 100px;
    margin: 0 auto;
  }
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(255,255,255,1)",
    color: "#000",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(5px)",
    color: "#fff",
  },
};
const mobileNavVariants = {
  open: {
    right: 0,
    transition: { duration: 0.5 },
  },
  close: {
    right: "-600px",
    transition: { duration: 0.5 },
  },
};

function Header() {
  const navigate = useNavigate();
  const homeMatch = useMatch("/");
  const galleryMatch = useMatch("/gallery");
  const roomMatch = useMatch("/room");
  const diningMatch = useMatch("/dining");
  const experienceMatch = useMatch("/experience");
  const eventMatch = useMatch("/event");
  const navAnimation = useAnimation();
  const mobileAnimation = useAnimation();
  const { scrollY } = useScroll();
  const reviewMatch = useMatch(`/review`);
  let { data: reviewList, isLoading } =
    useQuery<IReviewList>("reviewList", getReviews) ?? [];
  let star = 0;
  reviewList?.list.map((review) => (star += review.star));
  let voteValue = star / (reviewList?.list.length ?? 0);
  const isPC = useMediaQuery({
    query: `(min-width:${SIZE_TABLET_V}px)`,
  });
  const isMobile = useMediaQuery({
    query: `(max-width:${SIZE_TABLET_V - 1}px)`,
  });

  const [isNavShow, setIsNavShow] = useState(false);
  useEffect(() => {
    if (isNavShow == true) {
      mobileAnimation.start("open");
    } else {
      mobileAnimation.start("close");
    }
  }, [isNavShow, mobileAnimation]);
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);
  const reviewClick = () => {
    navigate("/review");
  };

  return (
    <>
      {isLoading && <p>loading...</p>}
      {isPC && isLoading == false && (
        <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
          <img
            src={process.env.PUBLIC_URL + "/image/logo.webp"}
            alt="fairfield by merriott"
          />
          <NavLists>
            <NavList>
              <Link to="/">
                소개
                {homeMatch ? <ListBar layoutId="listBar" /> : null}
              </Link>
            </NavList>
            <NavList>
              <Link to="/gallery">
                갤러리
                {galleryMatch ? <ListBar layoutId="listBar" /> : null}
              </Link>
            </NavList>
            <NavList>
              <Link to="/room">
                객실 & 스위트
                {roomMatch ? <ListBar layoutId="listBar" /> : null}
              </Link>
            </NavList>
            <NavList>
              <Link to="/dining">
                다이닝
                {diningMatch ? <ListBar layoutId="listBar" /> : null}
              </Link>
            </NavList>
            <NavList>
              <Link to="/experience">
                익스피리언스
                {experienceMatch ? <ListBar layoutId="listBar" /> : null}
              </Link>
            </NavList>
            <NavList>
              <Link to="/event">
                웨딩
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
            <span className="ratingValue" onClick={reviewClick}>
              ({voteValue}점)
            </span>
            {reviewMatch ? (
              <AnimatePresence>
                <Modal title="review" />
              </AnimatePresence>
            ) : null}
          </Review>
        </Nav>
      )}

      {isMobile && isLoading == false && (
        <>
          <Logo
            src={process.env.PUBLIC_URL + "/image/logo_W.png"}
            alt="fairfield by merriott"
          />
          <NavBtn className="navBtn" onClick={() => setIsNavShow(!isNavShow)}>
            {isNavShow ? (
              <MdOutlineClose size={"23px"} />
            ) : (
              <TfiMenuAlt size={"23px"} />
            )}
          </NavBtn>

          <MobileNav
            isNavShow={isNavShow}
            variants={mobileNavVariants}
            animate={mobileAnimation}
            initial={"close"}
          >
            <NavLists>
              <NavList>
                <Link to="/">
                  소개
                  {homeMatch ? <ListBar /> : null}
                </Link>
              </NavList>
              <NavList>
                <Link to="/gallery">
                  갤러리
                  {galleryMatch ? <ListBar /> : null}
                </Link>
              </NavList>
              <NavList>
                <Link to="/room">
                  객실 & 스위트
                  {roomMatch ? <ListBar /> : null}
                </Link>
              </NavList>
              <NavList>
                <Link to="/dining">
                  다이닝
                  {diningMatch ? <ListBar /> : null}
                </Link>
              </NavList>
              <NavList>
                <Link to="/experience">
                  익스피리언스
                  {experienceMatch ? <ListBar /> : null}
                </Link>
              </NavList>
              <NavList>
                <Link to="/event">
                  웨딩
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
              <span className="ratingValue" onClick={reviewClick}>
                ({voteValue}점)
              </span>
              {reviewMatch ? (
                <AnimatePresence>
                  <Modal title="review" />
                </AnimatePresence>
              ) : null}
            </Review>
          </MobileNav>
        </>
      )}
    </>
  );
}

export default Header;
