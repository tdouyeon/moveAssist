import FilterDropdown from '@components/FilterDropdown';
import './App.css';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';
import { fetchCenterData } from '@utils/api';
import { dataFormatterArray } from '@utils/formatters';
import { useEffect, useState } from 'react';
import { filteredRegions } from '@utils/filters';
import styled from 'styled-components';

function App() {
  const [region, setRegion] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [municipality, setMunicipality] = useState<string[]>([]);
  const [municipalityOptions, setMunicipalityOptions] = useState<string[]>([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  const getCenterInfo = async () => {
    const centerInfo = await fetchCenterData();
    const regions: string[] = dataFormatterArray(centerInfo, ['lclgvNm']);
    const region = regions.map((region) => region.split(' ')[0]);
    const uniqueRegion: string[] = [...new Set(region)];
    setRegion(uniqueRegion);
    setMunicipality(regions);
  };
  useEffect(() => {
    getCenterInfo();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const municipalityFilter = filteredRegions(municipality, selectedRegion);
      setMunicipalityOptions(municipalityFilter);
    } else {
      setMunicipalityOptions([]);
    }
  }, [selectedRegion]);

  const onRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const onMunicipalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMunicipality(e.target.value);
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
        {municipalityOptions && (
          <FilterDropdown
            value="시/군/구를 선택해주세요."
            onChange={onMunicipalityChange}
            options={municipalityOptions}
            seletedOption={selectedMunicipality}
          />
        )}
      </Filters>
      <KakaoMap la="37.365264512305174" lo="127.10676860117488" />
    </Layout>
  );
}

const Filters = styled.div`
  display: flex;
`;
export default App;
