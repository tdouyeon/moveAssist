import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchWeekPersonFacilitiesData } from '@utils/api';

function Facilites() {
  const [stationData, setStationData] = useState<StationData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getFacilitiesData();
  }, []);

  const getFacilitiesData = async () => {
    const data = await fetchWeekPersonFacilitiesData();
    setStationData(data);
  };

  const filteredStations = stationData.filter((station) =>
    station.stn_nm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div>
      <Heading>역사 내 시설</Heading>
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="역 이름을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ClearButton onClick={clearSearch}>×</ClearButton>
      </SearchInputWrapper>
      <InfoText>없는 노선이 있을 수 있으니 참고해 주세요.</InfoText>
      <Table>
        <thead>
          <tr>
            <TableHeader className="first">역 이름</TableHeader>
            <TableHeader>슬로우 열차 운행 여부</TableHeader>
            <TableHeader>통합 열차 운행 여부</TableHeader>
            <TableHeader className="last">엘리베이터 수</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredStations.map((station, index) => (
            <tr key={index}>
              <TableCell>{station.stn_nm}</TableCell>
              <TableCell>{station.pwdbs_slwy_estnc}</TableCell>
              <TableCell>{station.pwdbs_tolt_estnc}</TableCell>
              <TableCell>{station.whlch_liftt_cnt}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const Table = styled.table`
  width: 100%;
  border-spacing: 0 15px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  border: none;
  padding: 12px 20px;
  text-align: center;
  background-color: #5f0080;
  color: white;
  font-size: 16px;
  font-weight: 600;
  &.first {
    border-top-left-radius: 10px;
  }

  &.last {
    border-top-right-radius: 10px;
  }
`;

const TableCell = styled.td`
  border: none;
  padding: 12px 20px;
  text-align: center;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 40px;
  color: #333;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 220px;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 12px;
  margin: 10px auto;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
  &:focus {
    border-color: #5f0080;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #ccc;
  &:hover {
    color: #5f0080;
  }

  @media (max-width: 768px) {
    right: 60px;
  }
`;

const InfoText = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 10px;

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 15px;
  }
`;

export default Facilites;
