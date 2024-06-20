import styled from "styled-components";
import { IReview, IReviewList, deleteReviews, getReviews, postReviews } from "./api";
import ReactStars from "react-stars";
import { useQuery } from "react-query";
import { MdOutlineRateReview } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SIZE_PC = 1200;
const SIZE_TABLET_H = 1024;
const SIZE_TABLET_V = 768;
const SIZE_MOBILE = 480;

const ReviewModal = styled.div`
  padding: 0;
  font-family: "Gowun Dodum", serif;
`;
const TitlePos = styled.div`
  position: fixed;
  z-index: 101;
  /* top:20%; */
  width: 50%;
  min-width: 600px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  /* 모바일 세로 */
  @media only all and (min-height: 1000px) {
    top: 26%;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -1}px) {
    min-width: 400px;
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    min-width: auto;
    width: 95%;
  }
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
  position: relative;
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    margin-bottom: 30px;
  }
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
  position: absolute;
  right: 0;
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    top: 30px;
  }
`;
const Pagination = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
  }
  li {
    min-width: 30px;
    height: 30px;
    text-align: center;
    padding: 5px;
    background-color: #fff;
    color: #0d5ff5;
    border: 1px solid #0d5ff5;
    margin: 0 8px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 8px;
    cursor: pointer;
    font-family: "Gowun Dodum", serif;
    transition: all 0.5s;
    &:hover,
    &.active {
      background-color: #0d5ff5;
      color: #fff;
    }
  }
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
  position: relative;
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
    padding: 5px;
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
    cursor: pointer;
  }
  &.summitBtn {
    display: flex;
    width: 96%;
    justify-content: flex-end;
  }
  /* 모바일 가로 & 테블릿 세로 */
  @media only all and (min-width: ${SIZE_MOBILE}px) and (max-width: ${SIZE_TABLET_V -1}px) {
    flex-wrap: wrap;
    .userStar {
      margin: 10px 0;
      display: flex;
      align-items: center;
    }
    label {
      margin-right: 5px;
    }
    input[type="radio"] {
      margin: 0 8px 0 3px;
    }
    input[type="text"] {
      &.title {
        width: 89%;
      }
    }
    textarea {
      width: 100%;
      margin: 10px 0;
    }
    &.summitBtn {
      width: 100%;
    }
  }
  /* 모바일 세로 */
  @media only all and (max-width: ${SIZE_MOBILE - 1}px) {
    flex-wrap: wrap;
    .userStar {
      margin: 10px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    label {
      margin-right: 5px;
    }
    .userStar label:first-child {
      width: 100%;
      margin-bottom: 10px;
    }
    input[type="radio"] {
      margin: 0 5px 0 3px;
    }
    input[type="text"] {
      &.title {
        width: 89%;
      }
      margin: 10px 0;
    }
    textarea {
      width: 100%;
      margin: 10px 0;
    }
    &.summitBtn {
      width: 100%;
    }
  }
`;
const NoLoginBox = styled.div`
  width: 90%;
  text-align: center;
  margin: 20px auto;
  p {
    display: flex;
    align-items: center;
    width: 240px;
    margin: 20px auto;
    padding-bottom: 5px;
    border-bottom: 3px dotted #bed5ff;
  }
  button {
    padding: 10px;
    background-color: #9adeff;
    border-radius: 8px;
    width: 90%;
    cursor: pointer;
    box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.2);
  }
`;

function Review(props: { onClick: () => void }) {
  const navigate = useNavigate();
  const [isFetch,setIsFetch] = useState(false);

  //getReviews api 호출
  let { data: reviewList , refetch} =
    useQuery<IReviewList>({
      queryKey : "reviewList", 
      queryFn :getReviews,
    }) ?? [];
  if (reviewList !== undefined) {
    reviewList.list.sort((a: IReview, b: IReview) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
  }
  useEffect(()=>{
    refetch();
    setIsFetch(false);
  },[isFetch]);
  const [myValue, setMyValue] = useState({
    title: "",
    date: "",
    overview: "",
    star: 0,
    username: localStorage.getItem("userId") || "",
  });
  const [isWriteAll, setIsWriteAll] = useState(false);
  let isLogin = false;
  let [currentPage, setCurrentPage] = useState(1); // 현재 페이지번호
  let postsPerPage = 3; //한 페이지에 보여줄 게시글 갯수
  let totalPages = 0;

  // totalpage
  if (reviewList !== undefined) {
    totalPages = Math.ceil(reviewList?.list.length / postsPerPage);
  }
  let numArr = [];
  for (let i = 1; i <= totalPages; i++) {
    numArr.push(i);
  }
  //페이지네이션
  const displayedPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    if (!reviewList?.list) return [];
    else return reviewList.list.slice(startIndex, endIndex);
  };

  //Login 여부 확인
  if (localStorage.getItem("userId")) isLogin = true;
  else isLogin = false;
  //리뷰삭제 클릭시
  const handleDelete = (id : string) => {
    deleteReviews(id);
    setIsFetch(true);
  }

  //리뷰 input 내용 입력 시
  const handleChange = (
    keyValue: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMyValue({
      ...myValue,
      [keyValue]: e.target.value,
    });
  };

  //라디오버튼 클릭시
  const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyValue({
      ...myValue,
      star: Number(e.target.value),
    });
  };

  //로그인가기 버튼 클릭시
  const goLogin = () => {
    props.onClick();
    navigate("/login");
  };

  //등록 버튼 클릭시
  const handlePost = () => {
    if (myValue.username == "") {
      setIsWriteAll(false);
      alert("이름을 입력해주세요");
    } else if (myValue.title == "") {
      setIsWriteAll(false);
      alert("제목을 입력해주세요");
    } else if (myValue.overview == "") {
      setIsWriteAll(false);
      alert("내용을 입력해주세요");
    } else if (myValue.star == 0) {
      setIsWriteAll(false);
      alert("별점을 선택해주세요");
    } else {
      setIsWriteAll(true);
    }
    if (isWriteAll) {
      postReviews(myValue);
      alert("리뷰를 등록했습니다.");
      setIsFetch(true);
      props.onClick();
    }
  };

  return (
    <ReviewModal>
      <TitlePos>
        <ReviewTitle>
          <VscPreview size="30px" color="#0099ff" />
          Review
        </ReviewTitle>
      </TitlePos>
      <Ul>
        {displayedPosts().map((review: any) => (
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
                <Date>{review.date.replaceAll("-", ".").slice(0, 10)}
                  {review.username === myValue.username && 
                    <button onClick={()=>handleDelete(review._id)}>삭제</button>
                  }
                </Date>
              </UpData>
              <Title>{review.title}</Title>
            </Up>
            <Overview>{review.overview}</Overview>
          </Li>
        ))}

      </Ul>
      <Pagination>
        <p>{`${currentPage} / ${totalPages}`}</p>
        <ul>
          {currentPage > 1 && (
            <li
              className="page-item"
              onClick={() => setCurrentPage(currentPage--)}
            >
              Prev
            </li>
          )}
          {numArr.map((item: any) => (
            <li
              key={item}
              className={item == currentPage ? "active" : ""}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </li>
          ))}
          {currentPage !== totalPages && (
            <li
              className="page-item"
              onClick={() => setCurrentPage(currentPage++)}
            >
              Next
            </li>
          )}
        </ul>
      </Pagination>
      {!isLogin && (
        <NoLoginBox>
          <p>
            <MdOutlineRateReview size="25px" />
            로그인하고 리뷰를 작성하세요.
          </p>
          <button onClick={goLogin}>로그인 하러가기</button>
        </NoLoginBox>
      )}
      {isLogin && (
        <ReviewForm>
          <p>
            <MdOutlineRateReview size="30px" color="#0099ff" />
            리뷰 등록
          </p>
          <ReviewBox>
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              id="userName"
              value={myValue.username}
              disabled
            ></input>
            <div className="userStar">
              <label>별점 :</label>
              <span>1점</span>
              <input
                type="radio"
                name="userNumber"
                value="1"
                onChange={radioChange}
              ></input>
              <span>2점</span>
              <input
                type="radio"
                name="userNumber"
                value="2"
                onChange={radioChange}
              ></input>
              <span>3점</span>
              <input
                type="radio"
                name="userNumber"
                value="3"
                onChange={radioChange}
              ></input>
              <span>4점</span>
              <input
                type="radio"
                name="userNumber"
                value="4"
                onChange={radioChange}
              ></input>
              <span>5점</span>
              <input
                type="radio"
                name="userNumber"
                value="5"
                onChange={radioChange}
              ></input>
            </div>
          </ReviewBox>
          <ReviewBox>
            <label htmlFor="userTitle">제목</label>
            <input
              type="text"
              id="userTitle"
              className="title"
              value={myValue.title}
              onChange={(e) => handleChange("title", e)}
            ></input>
          </ReviewBox>
          <ReviewBox>
            <label htmlFor="userContent">내용</label>
            <textarea
              id="userContent"
              placeholder="내용을 입력하세요..."
              value={myValue.overview}
              onChange={(e) => handleChange("overview", e)}
            ></textarea>
          </ReviewBox>
          <ReviewBox className="summitBtn">
            <button type="button" onClick={handlePost}>
              확인
            </button>
          </ReviewBox>
        </ReviewForm>
      )}
    </ReviewModal>
  );
}

export default Review;
