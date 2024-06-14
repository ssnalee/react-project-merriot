import axios from "axios";

const BASE_PATH = "";
export interface IReview {
  username: string;
  date: number;
  title: string;
  overview: string;
  star: number;
}
export interface IReviewList {
  list: IReview[];
}

export const getReviews = async (): Promise<IReviewList> => {
  const response = await fetch(`http://localhost:8080/api`);
  return response.json();
};

export const postReviews = async (value : any) => {
  console.log(value);
  // const response = fetch(`http://localhost:8081/post`,{
  //   method : 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({value}),
  // });
  //console.log(response);
  const response = await axios.post('http://localhost:8080/post',value);
  console.log(response);
};
// export interface IReviews extends Array<IReviews> {}
