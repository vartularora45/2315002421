import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getNotifications = (filters) => {
  return axios.get(`${API_URL}/alerts`, { params: filters });
};

export const getPriorityInbox = () => {
  return axios.get(`${API_URL}/priority-inbox`);
};
