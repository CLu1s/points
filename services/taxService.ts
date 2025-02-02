import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_FIREBASE_API_BASE_URL;

export const fetchTaxBrackets = async (year: number) => {
  const response = await axios.get(`${API_BASE_URL}/${year}`);
  return response.data;
};
