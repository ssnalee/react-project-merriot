import axios from "axios";

const BASE_PATH = "";

export interface IReviews {
  username: string;
  date: number;
  title: string;
  overview: string;
  star: number;
}

export const getReviews = async (): Promise<IReviews> => {
  const response = await fetch(`http://localhost:8080/api`);
  return response.json();
};
