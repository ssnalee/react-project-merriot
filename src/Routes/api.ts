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

export const idCheck = async (value : any) => {
  const headers = {"Content-Type":"application/json"};
  const response = await axios.post('http://localhost:8080/idCheck',value,{headers:headers});
  return response.data;
};

export const login = async (value : any) => {
  console.log(value);
  const headers = {"Content-Type":"application/json"};
  const response = await axios.post(`http://localhost:8080/login`,value,{headers:headers});
  return response.data;
};

export const postUserInfo = async (value : any) => {
  const response = await axios.post('http://localhost:8080/postUserInfo',value);
};

