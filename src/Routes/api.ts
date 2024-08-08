import axios from "axios";

const BASE_PATH = "http://59.9.169.119:8080";
// const BASE_PATH = "http://localhost:8080";
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
  const response = await axios.get(`${BASE_PATH}/api`);
  return response.data;
};

export const postReviews = async (value : object) => {
  const response = await axios.post(`${BASE_PATH}/post`,value);
  return response.data;
};

export const deleteReviews = async (value : string) => {
  const response = await axios.delete(`${BASE_PATH}/delete`,{data:{ _id : value}});
  return response.data;
}

export const idCheck = async (value : object) => {
  const headers = {"Content-Type":"application/json"};
  const response = await axios.post(`${BASE_PATH}/idCheck`,value,{headers:headers});
  return response.data;
};

export const login = async (value : object) => {
  const headers = {"Content-Type":"application/json"};
  const response = await axios.post(`${BASE_PATH}/login`,value,{headers:headers});
  return response.data;
};

export const postUserInfo = async (value : object) => {
  const response = await axios.post(`${BASE_PATH}/postUserInfo`,value);
  return response.data;
};

