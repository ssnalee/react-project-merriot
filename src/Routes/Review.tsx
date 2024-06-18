import styled from "styled-components";
import { IReviewList, getReviews, postReviews} from "./api";
import ReactStars from "react-stars";
import { useQuery } from "react-query";
import { MdOutlineRateReview } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { useState } from "react";
const ReviewModal = styled.div`
  padding: 0;
`;
const TitlePos = styled.div`
  position: fixed;
  z-index: 101;
  /* top:20%; */
  width: 50%;
  min-width: 600px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
`;

const ReviewTitle = styled.h2`
  font-size: 25px;
  padding: 20px 10px;
  border-bottom: 3px double #999;
  width: 30%;
  min-width: 250px;
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
const Ul = styled.ul`
  margin-bottom: 2em;
  padding-top: 70px;
`;
const Li = styled.li`
  padding: 10px;
  border-bottom: 1px solid #777;
  margin: 0 20px;
`;
const Up = styled.div``;
const UpData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position : relative;
`;
const Name = styled.p`
  font-size: 1.2em;
  font-weight: 700;
  color: #76c3f6;
  margin-right: 10px;
`;
const Star = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Title = styled.h4`
  padding: 8px 0;
  font-size: 1.4em;
`;
const Overview = styled.p``;
const Date = styled.p`
  position : absolute;
  right : 0;
`;
const ReviewForm = styled.form`
  padding: 30px;
  p {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  }
`;
const ReviewBox = styled.div`
  postion: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .userStar {
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  label {
    margin-right: 10px;
  }
  input[type="radio"] {
    margin: 0 15px 0 3px;
  }
  input[type="text"] {
    width: 120px;
    height: 40px;
    border: none;
    border-bottom: 1px solid #76c3f6;
    &.title {
      width: 90%;
    }
  }
  textarea {
    width: 90%;
    resize: none;
    height: 100px;
    border: 1px solid #76c3f6;
    border-radius: 8px;
    padding: 5px;
  }
  input[type="text"]:focus,
  textarea:focus {
    outline: 1px solid #0099ff;
    border-radius: 8px;
  }
  button {
    width: 100px;
    height: 40px;
    border: none;
    background-color: #0099ff;
    color: #fff;
    border-radius: 8px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    cursor :pointer;
  }
  &.summitBtn {
    display: flex;
    width: 96%;
    justify-content: flex-end;   
  }
`;
function Review( props : {onClick : ()=>void,}) {
  let {
    data: reviewList,
    isLoading,
    isSuccess,
  } = useQuery<IReviewList>("reviewList", getReviews) ?? [];
  const [myValue, setMyValue] = useState({
    title : '',
    date : '',
    overview : '',
    star : 0,
    username : localStorage.getItem('userId') || '',
  })
  let isLogin = false;
  if(localStorage.getItem('userId')) isLogin=true;
  else isLogin = false;
  const [isWriteAll , setIsWriteAll] = useState(false);

  const handleChange = (keyValue : string ,e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMyValue({
      ...myValue,
      [keyValue] : e.target.value,
    });
  }
  const radioChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setMyValue({
      ...myValue,
      star : Number(e.target.value),
    }); 
  }

  const handlePost = ()=>{
    if(myValue.username == '') {
      setIsWriteAll(false);
      alert('이름을 입력해주세요');
    } else if(myValue.title == '') {
      setIsWriteAll(false);
      alert('제목을 입력해주세요');
    } else if(myValue.overview == '') {
      setIsWriteAll(false);
      alert('내용을 입력해주세요');
    } else if(myValue.star == 0) {
      setIsWriteAll(false);
      alert('별점을 선택해주세요');
    } else {
      setIsWriteAll(true);
    }
    if(isWriteAll){
      postReviews(myValue)
      alert('리뷰를 등록했습니다.');
      props.onClick();
    }
  }

  return (
    <ReviewModal>
      <TitlePos>
        <ReviewTitle>
          <VscPreview size="30px" color="#0099ff" />
          Review
        </ReviewTitle>
      </TitlePos>
      <Ul>
        {reviewList?.list.map((review: any) => (
          <Li key={review._id}>
            <Up>
              <UpData>
                <Name>{review.username}</Name>
                <Star>
                  <ReactStars
                    count={5}
                    value={review.star}
                    color1="#E6E6E6"
                    color2="#FFCC33"
                    half
                    size={20}
                    edit={false}
                    className="star"
                  />
                  <span className="starValue">({review.star}점)</span>
                </Star>
                <Date>{review.date.replaceAll('-','.').slice(0,10)}</Date>
              </UpData>
              <Title>{review.title}</Title>
            </Up>
            <Overview>{review.overview}</Overview>
          </Li>
        ))}
      </Ul>
      {isLogin && <ReviewForm>
        <p>
          <MdOutlineRateReview size="30px" color="#0099ff" />
          리뷰 등록
        </p>
        <ReviewBox>
          <label htmlFor="userName">이름</label>
          <input type="text" id="userName" value={myValue.username} disabled></input>
          <div className="userStar">
            <label>별점 :</label>
            <span>1점</span>
            <input type="radio" name="userNumber" value="1" onChange={radioChange}></input>
            <span>2점</span>
            <input type="radio" name="userNumber" value="2" onChange={radioChange}></input>
            <span>3점</span>
            <input type="radio" name="userNumber" value="3" onChange={radioChange}></input>
            <span>4점</span>
            <input type="radio" name="userNumber" value="4" onChange={radioChange}></input>
            <span>5점</span>
            <input type="radio" name="userNumber" value="5" onChange={radioChange}></input>
          </div>
        </ReviewBox>
        <ReviewBox>
          <label htmlFor="userTitle">제목</label>
          <input type="text" id="userTitle" className="title" value={myValue.title} onChange={(e)=>handleChange('title',e)}></input>
        </ReviewBox>
        <ReviewBox>
          <label htmlFor="userContent">내용</label>
          <textarea
            id="userContent"
            placeholder="내용을 입력하세요..."
            value={myValue.overview}
            onChange={(e)=>handleChange('overview',e)}
          ></textarea>
        </ReviewBox>
        <ReviewBox className="summitBtn">
          <button type="button" onClick={handlePost}>확인</button>
        </ReviewBox>
      </ReviewForm>}
      
    </ReviewModal>
  );
}

export default Review;
