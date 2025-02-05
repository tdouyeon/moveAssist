import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KaMapType {
  la?: string;
  lo?: string;
}

function KakaoMap({ la, lo }: KaMapType) {
  console.log(la, lo);
  return (
    <Map
      center={{ lat: Number(la), lng: Number(lo) }}
      style={{ width: '500px', height: '500px' }}
    >
      <MapMarker position={{ lat: Number(la), lng: Number(lo) }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}

export default KakaoMap;
