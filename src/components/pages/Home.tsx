import FilterDropdown from '@components/FilterDropdown';
import KakaoMap from '@components/KakaoMap';
import { fetchCenterData } from '@utils/api';
import {
  convertAddressesToCoordinates,
  dataFormatterArray,
  formatRegions,
} from '@utils/formatters';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '@components/Sidebar';

function Home() {
  const [centerInfo, setCenterInfo] = useState<CenterInfo[]>([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [clickedMarkerIndex, setClickedMarkerIndex] = useState<number>(-1);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCenterInfo();

    // 사이드바 외부를 클릭하면 사이드바 닫기
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      getSelectedCenter();
    } else {
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (clickedMarkerIndex !== -1) {
      setSidebarVisible(true);
    }
  }, [clickedMarkerIndex]);

  const getCenterInfo = async () => {
    const centerInfo = await fetchCenterData();
    console.log(centerInfo, 'centerInfo');

    // cntrRoadNmAddr 기준으로 마커가 찍히기 때문에 해당 값만 빈문자열 체크
    const nonEmptyCenterInfo: CenterInfo[] = centerInfo.filter(
      (address: CenterInfo) => address.cntrRoadNmAddr !== ''
    );

    setCenterInfo(nonEmptyCenterInfo);
  };

  const getSelectedCenter = async () => {
    const regionCoordinate = await convertAddressesToCoordinates([
      selectedRegion,
    ]);
    setCenter(regionCoordinate[0]);
  };

  console.log(clickedMarkerIndex, 'clickedMarkerIndex');

  const onRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const clickMarker = (index: number) => {
    setClickedMarkerIndex(index);
    setSidebarVisible(true);
  };

  return (
    <div>
      {centerInfo && centerInfo.length > 0 && (
        <div>
          <Heading>교통약자이동지원센터 정보</Heading>
          <Description>
            지방자치단체의 교통약자이동지원센터에 관한 정보를 확인하실 수
            있습니다. <br />
            수도권은 포함되지 않습니다.
          </Description>
          <Filters>
            <FilterDropdown
              value="지역을 선택해주세요."
              onChange={onRegionChange}
              options={formatRegions(centerInfo)}
              seletedOption={selectedRegion}
            />
          </Filters>
          <KakaoMap
            addresses={dataFormatterArray(centerInfo, ['cntrRoadNmAddr'])}
            center={center}
            clickMarker={clickMarker}
          />
        </div>
      )}
      {sidebarVisible && centerInfo.length > 0 && (
        <Sidebar
          ref={sidebarRef}
          centerInfo={centerInfo[clickedMarkerIndex]}
          onClose={() => setSidebarVisible(false)}
        />
      )}
    </div>
  );
}
const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  margin-bottom: 10px;
  color: #333;
`;

const Description = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 40px;
`;

const Filters = styled.div`
  display: flex;
  justify-content: center;
`;

export default Home;
