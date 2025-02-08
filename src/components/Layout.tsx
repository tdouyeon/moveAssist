import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const Layout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.main`
  flex: 1;
  padding: 16px;
`;
