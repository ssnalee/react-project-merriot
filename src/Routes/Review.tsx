import styled from "styled-components";
import { IReviews } from "./api";
import ReactStars from "react-stars";

interface IReviewData {
  reviewList: IReviews[];
}
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

const H2 = styled.h2`
  font-size: 25px;
  padding: 20px 10px;
  border-bottom: 1px solid #999;
  width: 30%;
  min-width: 250px;
  margin-left: 20px;
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
const Date = styled.p``;
function Review(reviewList: IReviewData) {
  console.log(reviewList);

  return (
    <ReviewModal>
      <TitlePos>
        <H2>Review</H2>
      </TitlePos>
      <Ul>
        {reviewList?.reviewList.map((review: any) => (
          <Li key={review.id}>
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
                <Date>{review.date}</Date>
              </UpData>
              <Title>{review.title}</Title>
            </Up>
            <Overview>{review.overview}</Overview>
          </Li>
        ))}
      </Ul>
    </ReviewModal>
  );
}

export default Review;
