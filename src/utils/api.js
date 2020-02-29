import axios from 'axios';

class Services {
  constructor() {
    this.baseUrl = 'https://www.mocky.io/v2/';
  }

  get(params) {
    return axios.get(`${this.baseUrl}${params}`).then(({ data }) => data);
  }
}

export default Services;
