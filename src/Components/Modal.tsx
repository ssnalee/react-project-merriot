import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import Review from "../Routes/Review";
import { useEffect } from "react";
import PropTypes from "prop-types";

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
  top: 200px;
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
  /* 모바일 세로 */
  @media only all and (min-height: 1000px){
    top: 26%;
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
  const onOverlayClicked = () => {
    setIsModal(false);
    modalUnMount();
  };
  if (!isModal) return null;

  return (
    <Overlay animate={{ opacity: 1 }} exit={{ opacity: 0}} onClick={onOverlayClicked}>
      <ModalBox initial={{ scale: 1 }} animate={{}} exit={{ scale: 0 }}>
        <ModalRelative>
          <AiOutlineClose
            onClick={onOverlayClicked}
            className="closeModal"
            size={"30px"}
          />
        </ModalRelative>

        {title == "review" ? <Review /> : null}
      </ModalBox>
    </Overlay>
  );
}
Modal.propTypes = {
  isModal : PropTypes.bool.isRequired,
  setIsModal : PropTypes.func.isRequired,
}
export default Modal;
