import styled from 'styled-components';
import carriage from '/images/underground-carriage.jpg';
const About = () => {
  return (
    <AboutContainer>
      <Heading>Move Assist</Heading>
      <Description>
        이 사이트는 교통 약자분들이 <strong>교통약자이동센터</strong>와{' '}
        <strong>역사 내 편의시설</strong>에 대한 정보를 쉽게 확인할 수 있도록
        제작되었습니다. 해당 정보는{' '}
        <strong>행정안전부 한국지역정보개발원</strong>의 지방자치단체 교통약자
        이동지원센터 데이터와 <strong>한국철도공사</strong>의 편의시설 정보
        데이터를 기반으로 제공됩니다.
      </Description>
      <TrailImage src={carriage} alt="trail" />
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 40px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  max-width: 800px;
  line-height: 1.8;
  margin-bottom: 20px;

  strong {
    color: #5f0080;
  }
`;

const TrailImage = styled.img`
  margin-top: 20px;
  width: 90vw;
  height: 70vh;
  margin-right: 5px;
  object-fit: cover;
`;

export default About;
