// src/utils/localStorage.js

export const getReadStatus = () => {
    const status = localStorage.getItem('readNotifications');
    return status ? JSON.parse(status) : {};
  };
  
  export const setReadStatus = (id) => {
    const status = getReadStatus();
    status[id] = true;
    localStorage.setItem('readNotifications', JSON.stringify(status));
  };
  