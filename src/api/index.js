import axios from 'axios';

export const fetchTrafficRecords = async () => {
  const url = 'http://192.168.1.172:8087/api/v1/traffic-records/filter';

  try {
    const response = await axios.get(url);
    console.log("the response is:", response.data);
    return response.data.data;
  } catch (error) {
    console.error('There was an error fetching the data!', error);
    return [];
  }
};

