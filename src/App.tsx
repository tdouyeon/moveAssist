import './App.css';
import KakaoMap from '@components/KakaoMap';
import Layout from '@components/Layout';

function App() {
  return (
    <Layout>
      <KakaoMap la="37.365264512305174" lo="127.10676860117488" />
    </Layout>
  );
}

export default App;
