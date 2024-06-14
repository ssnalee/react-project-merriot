import { motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import Review from "../Routes/Review";
import { IReviews } from "./../Routes/api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 999;
`;
const ModalBox = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  min-width: 600px;
  height: 600px;
  overflow: auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.lighter};
  z-index: 1000;
`;
const ModalRelative = styled.div`
  /* position: relative; */
  position: fixed;
  /* top: 20%;
   right: 26%; */
  width: 50%;
  min-width: 600px;
  color: #899;
  z-index: 103;
  clear: both;

  .closeModal {
    /* position: fixed; */
    /* top: 20%;
   right: 26%; */
    width: 30px;
    height: 30px;
    color: #899;
    z-index: 103;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #000;
    }
  }
`;

interface IModal {
  title: string;
  returnUrl?: string;
  reviewList: IReviews[];
}

function Modal({ title, reviewList, returnUrl }: IModal) {
  const navigate = useNavigate();
  const onOverlayClicked = () => {
    if (returnUrl) {
      navigate(returnUrl);
    } else {
      navigate(-1);
    }
  };
  return (
    <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ModalBox initial={{ scale: 1 }} animate={{}} exit={{ scale: 0 }}>
        <ModalRelative>
          <AiOutlineClose
            onClick={onOverlayClicked}
            className="closeModal"
            size={"30px"}
          />
        </ModalRelative>

        {title == "review" ? <Review reviewList={reviewList} /> : null}
      </ModalBox>
    </Overlay>
  );
}

export default Modal;
