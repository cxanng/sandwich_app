import axios from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getAllSandwich = async () => {
  const response = await axios.get(`${SERVER_URL}/v1/sandwich`);
  console.log(response.data);
  return response.data;
}
