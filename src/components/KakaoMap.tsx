import { useState, useEffect, useRef } from 'react';
import { convertAddressesToCoordinates } from '@utils/formatters';

interface KaMapType {
  addresses: string[];
  center: { lat: number; lng: number };
}

function KakaoMap({ addresses, center }: KaMapType) {
  const [locations, setLocations] = useState<{ lat: number; lng: number }[]>(
    []
  );
  const mapRef = useRef<HTMLDivElement | null>(null);

  const checkKakaoAPI = () => {
    if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
      console.log('Kakao Maps API가 정상적으로 로드되었습니다.');
      return true;
    } else {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return false;
    }
  };

  const convertCoordinates = async () => {
    if (checkKakaoAPI()) {
      try {
        console.log('주소 변환 시작');
        const result = await convertAddressesToCoordinates(addresses);
        console.log('주소 변환된 좌표:', result);
        setLocations(result);
      } catch (error) {
        console.error('API 로딩 실패 혹은 주소 변환 오류', error);
      }
    }
  };

  useEffect(() => {
    convertCoordinates();
  }, []);

  useEffect(() => {
    if (locations.length === 0 || !mapRef.current) return;

    console.log('지도 컨테이너:', mapRef.current);

    const imageSrc = '/images/location.png';
    const imageSize = new window.kakao.maps.Size(40, 40);
    const imageOption = {
      offset: new kakao.maps.Point(imageSize.width / 2, imageSize.height),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const mapOption = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: 10,
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOption);

    locations.forEach((location) => {
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(location.lat, location.lng),
        image: markerImage,
      });
    });
  }, [locations, center]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '350px' }} />
    </div>
  );
}

export default KakaoMap;
