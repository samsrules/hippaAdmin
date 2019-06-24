import axios from 'axios';

export default
   axios.create({
      baseURL: 'http://ec2-34-217-28-142.us-west-2.compute.amazonaws.com:8000/',
      //baseURL: 'http://localhost:8000/',
      timeout: 10000
   });