import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import Review from "../Routes/Review";
import { useEffect } from "react";
import PropTypes from "prop-types";

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  z-index: 1000;
`;
const ModalBox = styled(motion.div)`
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 50%;
  min-width: 600px;
  max-height: 600px;
  overflow: auto;
  border-radius: 20px;
  background-color: ${(props) => props.theme.white.lighter};
  color: ${(props) => props.theme.black.lighter};
  z-index: 1000;
  /* 모바일 세로 */
  @media only all and (min-height: 1000px){
    top: 26%;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_TABLET_V}px) {
    min-height:600px;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -
    1}px) {
      min-width:400px;
      height:80%;
      top:10%;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    min-width:auto;
    width:95%;
    height:85%;
    top:10%;
  }
`;
const ModalRelative = styled.div`
  position: fixed;
  width: 50%;
  min-width: 600px;
  color: #899;
  z-index: 103;
  clear: both;
  .closeModal {
    width: 30px;
    height: 30px;
    color: #899;
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #000;
    }
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -
    1}px) {
      min-width:400px;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    min-width:auto;
    width:95%;
  }
`;

interface IModal {
  title: string;
  setIsModal : Function;
  isModal : boolean;
}
function modalMount(){
  document.body.style.overflow = 'hidden';
}
function modalUnMount(){
  document.body.style.overflow = 'unset';
}
function Modal({ title, setIsModal, isModal }: IModal) {
  useEffect(()=>{
    modalMount();
  },[]);
  function onOverlayClicked(){
    setIsModal(false);
    modalUnMount();
  };
  if (!isModal) return null;

  return (
    <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0}} onClick={()=>onOverlayClicked()}>
      <ModalBox initial={{ scale: 1 }} animate={{}} exit={{ scale: 0 }} onClick={e=>e.stopPropagation()}>
        <ModalRelative>
          <AiOutlineClose
            onClick={onOverlayClicked}
            className="closeModal"
            size={"30px"}
          />
        </ModalRelative>

        {title == "review" ? <Review onClick={onOverlayClicked}/> : null}
      </ModalBox>
    </Overlay>
  );
}
Modal.propTypes = {
  isModal : PropTypes.bool.isRequired,
  setIsModal : PropTypes.func.isRequired,
}
export default Modal;
