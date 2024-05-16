import axios from 'axios';

const instance = axios.create({

  // Include cookies in cross-origin requests
  withCredentials: true
});

export default instance;
