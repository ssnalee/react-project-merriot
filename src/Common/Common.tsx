import styled from 'styled-components';
// import arrow from '../../public/image/right_arrow.svg';
const arrow = "image/right_arrow.svg";
export const NextTo = styled.div`
    background-image: url(${arrow});
    background-size: contain;
    background-repeat: no-repeat;
    height: 20px;
    width: 20px;
`

export const Prev = styled.div`
    transform: rotate(180deg);
    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-size: contain;
    height: 20px;
    width: 20px;
`