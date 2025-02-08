import styled from 'styled-components';
import logo from '/images/logo.png';

const Header = () => {
  return (
    <HeaderContainer>
      <Container href="/">
        <Logo src={logo} alt="Logo" />
        <Title>모두의 이동</Title>
      </Container>
      <Nav>
        <NavItem href="/">이동케어</NavItem>
        <NavItem href="/facilites">역사 내 시설</NavItem>
        <NavItem href="/about">소개</NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  padding: 16px;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Container = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c2c2c;
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 16px;
  margin-left: 4rem;

  @media (max-width: 768px) {
    margin-left: 0rem;
    margin-top: 1rem;
  }
`;

const NavItem = styled.a`
  color: #2c2c2c;
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.3s;
  margin-left: 2rem;

  &:hover {
    color: #5f0080;
  }

  @media (max-width: 768px) {
    margin-left: 0rem;
  }
`;
