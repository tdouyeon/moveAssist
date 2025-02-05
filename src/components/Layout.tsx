import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <Main>{children}</Main>
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
