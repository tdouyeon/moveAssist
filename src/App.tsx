import FilterDropdown from '@components/FilterDropdown';
import './App.css';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import { fetchCenterData } from '@utils/api';
import {
  convertAddressesToCoordinates,
  dataFormatterArray,
} from '@utils/formatters';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function App() {
  const [region, setRegion] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [addresses, setAddresses] = useState<string[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const getCenterInfo = async () => {
    const centerInfo = await fetchCenterData();
    const addresses: string[] = dataFormatterArray(centerInfo, [
      'cntrRoadNmAddr',
    ]);
    setAddresses(addresses);
    const regions: string[] = dataFormatterArray(centerInfo, ['lclgvNm']);
    const region = regions.map((region) => region.split(' ')[0]);
    const uniqueRegion: string[] = [...new Set(region)];
    setRegion(uniqueRegion);
  };

  const getSelectedCenter = async () => {
    const regionCoordinate = await convertAddressesToCoordinates([
      selectedRegion,
    ]);
    setCenter(regionCoordinate[0]);
  };

  useEffect(() => {
    getCenterInfo();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      getSelectedCenter();
    } else {
    }
  }, [selectedRegion]);

  const onRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <Layout>
      <Filters>
        {region && (
          <FilterDropdown
            value="지역을 선택해주세요."
            onChange={onRegionChange}
            options={region}
            seletedOption={selectedRegion}
          />
        )}
      </Filters>
      {addresses.length > 1 && (
        <KakaoMap addresses={addresses} center={center} />
      )}
    </Layout>
  );
}

const Filters = styled.div`
  display: flex;
`;
export default App;
