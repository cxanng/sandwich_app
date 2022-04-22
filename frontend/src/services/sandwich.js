import axios from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getAllSandwich = async () => {
  const response = await axios.get(`${process.env.SERVER_URL ? process.env.SERVER_URL : SERVER_URL}/v1/sandwich`);
  console.log(response.data);
  return response.data;
}
