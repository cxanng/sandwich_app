import axios from 'axios';
import { SERVER_URL } from '../utils/constants';

export const getAllOrders = async () => {
  const response = await axios.get(`${SERVER_URL}/v1/order`);
  return response.data;
}

export const placeNewOrder = async (sandwichId) => {
  const body = {
    sandwichId: sandwichId
  }
  const response = await axios.post(`${process.env.SERVER_URL ? process.env.SERVER_URL : SERVER_URL}/v1/order`, body);
  console.log(response.data);
  return response.data;
}