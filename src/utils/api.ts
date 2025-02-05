import axios from 'axios';

const apiTransportSupportClient = axios.create({
  baseURL: 'http://apis.data.go.kr/B551982/tsdo',
  timeout: 10000,
});

const apiKorailFacilitiesInfoClient = axios.create({
  baseURL: 'http://apis.data.go.kr/B551457/convenience',
  timeout: 10000,
});

const fetchData = async (endpoint: string, params: {}) => {
  try {
    const response = await apiTransportSupportClient.get(endpoint, { params });
    console.log(response.data.body.item, `Response from ${endpoint}`);
    return response.data.body.item;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
  }
};

const defaultParams = {
  serviceKey: import.meta.env.VITE_TRANSPORT_SUPPORT_API_KEY,
  numOfRows: 1000,
};

//교통약자 택시 차량 이용가능 정보
export const fetchVeHicleUseData = () =>
  fetchData('/info_vehicle_use', defaultParams);

//교통약자이동지원센터 현황
export const fetchCenterData = () => fetchData('/center_info', defaultParams);

//교통약자 택시 차량 정보
export const fetchVeHicleData = () => fetchData('/info_vehicle', defaultParams);

// 교통약자 편의시설
export const fetchWeekPersonFacilitiesData = async () => {
  try {
    const response = await apiKorailFacilitiesInfoClient.get(
      '/weekPersonFacilities',
      {
        params: {
          serviceKey: import.meta.env.VITE_TRANSPORT_SUPPORT_API_KEY,
          numOfRows: 1000,
        },
      }
    );
    console.log(
      response.data.response.body.items.item,
      'Response from /weekPersonFacilities'
    );
    return response.data.response.body.items.item;
  } catch (error) {
    console.error('Error fetching /weekPersonFacilities', error);
  }
};
