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

export interface IUser {
  userId: string;
  userPw: string;
}
export const getReviews = async (): Promise<IReviewList> => {
  const response = await fetch(`http://localhost:8080/api`);
  return response.json();
};

export const postReviews = async (value : any) => {
  console.log(value);
  const response = await axios.post('http://localhost:8080/post',value);
  console.log(response);
};

export const idCheck = async (myUserInfo : any) => {
  const headers = {"Content-Type":"application/json"};
  const response = await axios.post('http://localhost:8080/idCheck',myUserInfo,{headers:headers});
  return response.data;
};

export const getUserInfo = async (): Promise<IUser> => {
  const response = await axios.get(`http://localhost:8080/getUserInfo`);
  return response.data;
};

export const postUserInfo = async (value : any) => {
  console.log(value);
  const response = await axios.post('http://localhost:8080/postUserInfo',value);
  console.log(response);
};

