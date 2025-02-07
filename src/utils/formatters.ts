// 객체가 들어가있는 배열에서 객체마다 원하는 키-값만 뽑아내는 함수
export const dataFormatterObject = (data: CenterInfo[], filter: string[]) => {
  return data.map((item) =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => filter.includes(key))
    )
  );
};

/*
1. data.map: data 배열의 각 개체를 순회하며 새로운 객체를 만들고, 그 새로운 객체들을 모아서 새로운 배열을 반환
2. Object.entries(item): item 객체의 키-쌍 값을 배열 형태로 변환하는 메서드
{ name: 'Alice', age: 25, city: 'Seoul' } ->  [['name', 'Alice'], ['age', 25], ['city', 'Seoul']]
3. filter(([key]) => filter.includes(key)): 키로 필터링
4. Object.fromEntries(): 배열 -> 객체 변환 메서드
*/
type KeyOfCenterInfo = keyof CenterInfo;

export const dataFormatterArray = (
  data: CenterInfo[],
  filter: KeyOfCenterInfo[]
) => {
  return data.map((item) => filter.map((key) => item[key])).flat(); // 2차원 배열을 1차원 배열로 평평하게 만듦
};
export const checkKakaoApi = () => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(true);
    } else {
      reject('카카오맵 API 로딩 실패');
    }
  });
};

export const formatRegions = (centerInfo: CenterInfo[]): string[] => {
  const regions: string[] = dataFormatterArray(centerInfo, ['lclgvNm']);
  const region = regions.map((region) => region.split(' ')[0]);
  return [...new Set(region)];
};

export const convertAddressesToCoordinates = async (
  addresses: string[]
): Promise<{ lat: number; lng: number }[]> => {
  try {
    console.log('주소 변환 시작');

    // 에러 방지를 위한 빈 문자열 제거
    const filteredAddresses = addresses.filter(
      (address) => address.trim() !== ''
    );

    const coordinates = await Promise.all(
      filteredAddresses.map(async (address) => {
        try {
          const coord = await new Promise<{ lat: number; lng: number } | null>(
            (resolve) => {
              const geocoder = new window.kakao.maps.services.Geocoder();

              geocoder.addressSearch(
                address,
                (
                  result: kakao.maps.services.AddressSearchResult[],
                  status: kakao.maps.services.Status
                ) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    resolve({
                      lat: parseFloat(result[0].y),
                      lng: parseFloat(result[0].x),
                    });
                  } else {
                    console.warn(`주소 변환 실패: ${address}`);
                    resolve(null);
                  }
                }
              );
            }
          );

          return coord;
        } catch (error) {
          console.error(`주소 변환 에러 발생: ${address}`, error);
          return null;
        }
      })
    );

    const validCoordinates = coordinates.filter(
      (coord): coord is { lat: number; lng: number } => coord !== null
    );

    console.log('변환된 좌표 목록:', validCoordinates);

    return validCoordinates;
  } catch (error) {
    console.error('주소 변환 중 치명적 에러 발생:', error);
    return [];
  }
};
