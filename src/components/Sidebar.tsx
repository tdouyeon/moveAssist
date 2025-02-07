import { forwardRef } from 'react';
import styled from 'styled-components';

interface SidebarType {
  ref: HTMLDivElement | null;
  centerInfo: CenterInfo;
  onClose: () => void;
}

const formatTime = (time: string): string => {
  const hours = time.slice(0, 2);
  const minutes = time.slice(2, 4);
  return `${hours}:${minutes}`;
};

const Sidebar = forwardRef<HTMLDivElement, SidebarType>(
  ({ centerInfo, onClose }, ref) => {
    return (
      <SidebarContainer ref={ref}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>{centerInfo.cntrNm}</h2>
        <p>
          <Title className="subTitle">주소</Title>
          <Content>{centerInfo.cntrRoadNmAddr}</Content>
        </p>
        <p>
          <Title className="subTitle">전화번호</Title>
          <Content>{centerInfo.cntrTelno}</Content>
        </p>
        <p>
          <Title className="subTitle">운영 시간</Title>
          <Content>
            {formatTime(centerInfo.wkdyOprBgngTm)} -{' '}
            {formatTime(centerInfo.wkdyOprEndTm)}
          </Content>
        </p>
        <p>
          <Title className="subTitle">예약 사이트</Title>
          <Content>
            {centerInfo.rsvtSiteUrlAddr &&
            centerInfo.rsvtSiteUrlAddr !== '해당없음' ? (
              <a
                href={centerInfo.rsvtSiteUrlAddr}
                target="_blank"
                rel="noopener noreferrer"
              >
                예약하기
              </a>
            ) : (
              '해당없음'
            )}
          </Content>
        </p>
        <p>
          <Title className="subTitle">기본 요금 설명</Title>
          <Content>{centerInfo.bscCrgExpln}</Content>
        </p>
        <p>
          <Title className="subTitle">운영 지역</Title>
          <Content>{centerInfo.btjrOprRgnNm.replace(/\+/g, ', ')}</Content>
        </p>
        <p>
          <Title className="subTitle">대상 설명</Title>
          <Content>{centerInfo.utztnTrgtExpln}</Content>
        </p>
        <p>
          <Title className="subTitle">예약일 제한</Title>
          <Content>{centerInfo.rsvtGdMttr}</Content>
        </p>
        <p>
          <Title className="subTitle">예약 가능한 차량 수</Title>
          <Content>{centerInfo.dayVhclUtztnNmtm}</Content>
        </p>
        <p>
          <Title className="subTitle">운영 일자</Title>
          <Content>
            {formatTime(centerInfo.wkdyRsvtBgngTm)} -{' '}
            {formatTime(centerInfo.wkdyRsvtEndTm)}
          </Content>
        </p>
        <p>
          <Title className="subTitle">서비스 앱</Title>
          <Content>
            {centerInfo.appSrvcNm.replace(/\+/g, '/') || '없음'}
          </Content>
        </p>
      </SidebarContainer>
    );
  }
);

export default Sidebar;

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 500px;
  height: 100%;
  max-height: 100vh;
  background-color: #fbfbfb;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  p {
    margin-bottom: 12px;
    word-wrap: break-word;
    line-height: 1.6;
    font-size: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 8px;
    text-align: start;
  }
`;

const Title = styled.span`
  width: 150px;
  font-weight: bold;
  margin-right: 10px;
  flex-shrink: 0;
`;

const Content = styled.span`
  flex-grow: 1;
  word-break: break-word;
  display: inline-block;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
  cursor: pointer;

  &:hover {
    color: #5f0080;
  }
`;
