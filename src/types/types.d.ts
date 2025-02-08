declare global {
  interface Coordinates {
    lat: number;
    lng: number;
  }

  interface Window {
    kakao: typeof kakao;
  }

  type CenterInfo = {
    appSrvcNm: string; // 서비스 이름 (예: 센터 이름, 서비스 종류 등)
    bfhdRsvtPrdExpln: string; // 예약 기간 설명 (예약할 수 있는 기간에 대한 설명)
    bscCrgExpln: string; // 기본 요금 설명 (서비스나 이용에 대한 기본 요금 설명)
    btjrOprRgnNm: string; // 버스 운행 지역 이름 (운행되는 지역 이름)
    cntrId: string; // 센터 ID (센터의 고유 식별자)
    cntrLotnoAddr: string; // 센터 지번 주소 (센터의 지번 주소)
    cntrNm: string; // 센터 이름 (센터의 명칭)
    cntrRoadNmAddr: string; // 센터 도로명 주소 (센터의 도로명 주소)
    cntrTelno: string; // 센터 전화번호 (센터의 연락처 번호)
    dayVhclUtztnNmtm: string; // 차량 이용 시간 (하루 동안 차량 이용 가능한 시간)
    exchrgCrgExpln: string; // 교환 요금 설명 (서비스 이용 시 발생하는 교환 요금 설명)
    hldVhclTcntom: string; // 보유 차량 수 (센터에서 보유 중인 차량 대수)
    lat: string; // 위도 (센터의 위치 정보 중 위도)
    lclgvNm: string; // 지역 정부 이름 (센터가 위치한 지역 정부의 명칭)
    lot: string; // 경도 (센터의 위치 정보 중 경도)
    mngInstNm: string; // 관리 기관 이름 (센터를 관리하는 기관의 이름)
    mngInstTelno: string; // 관리 기관 전화번호 (관리 기관의 연락처 번호)
    rsvtGdMttr: string; // 예약 시 중요한 사항 (예약 시 유의해야 할 사항)
    rsvtSiteUrlAddr: string; // 예약 사이트 URL (예약을 진행할 수 있는 웹사이트 URL)
    stdgCd: string; // 기준 코드 (센터에 대한 기준 코드, 예: 서비스 유형 코드 등)
    totCrtrYmd: string; // 총 설립 연월일 (센터가 설립된 날짜, 연도/월 형식)
    utztnTrgtExpln: string; // 이용 대상 설명 (서비스를 이용할 수 있는 대상자에 대한 설명)
    wkdyOprBgngTm: string; // 평일 운영 시작 시간 (평일 운영이 시작되는 시간)
    wkdyOprEndTm: string; // 평일 운영 종료 시간 (평일 운영이 종료되는 시간)
    wkdyRsvtBgngTm: string; // 평일 예약 시작 시간 (평일 예약이 시작되는 시간)
    wkdyRsvtEndTm: string; // 평일 예약 종료 시간 (평일 예약이 종료되는 시간)
    wkndOperHrExpln: string; // 주말 운영 시간 설명 (주말에 운영되는 시간에 대한 설명)
    wkndOperYn: string; // 주말 운영 여부 (주말에 운영되는지 여부, Y 또는 N)
  };

  type StationData = {
    pwdbs_slwy_estnc: 'Y' | 'N'; // 슬로우 열차 운행 여부 (Y 또는 N)
    pwdbs_tolt_estnc: 'Y' | 'N'; // 통합 열차 운행 여부 (Y 또는 N)
    stn_cd: string; // 역 코드 (문자열)
    stn_nm: string; // 역 이름 (문자열)
    whlch_liftt_cnt: number; // 엘리베이터 수 (숫자)
  };

  // kakao.maps.services 네임스페이스 확장
  namespace kakao.maps.services {
    export interface AddressSearchResult {
      address_name: string;
      x: string;
      y: string;
      road_address: {
        address_name: string;
        building_name: string;
        main_address_no: string;
        region_1depth_name: string;
        region_2depth_name: string;
        region_3depth_name: string;
        sub_address_no: string;
      };
    }

    export enum Status {
      OK = 'OK',
      ERROR = 'ERROR',
      ZERO_RESULT = 'ZERO_RESULT',
      FAIL = 'FAIL',
    }

    export class Geocoder {
      addressSearch(
        addr: string,
        callback: (result: AddressSearchResult[], status: Status) => void,
        options?: { page: number; size: number; analyze_type: string }
      ): void;
    }
  }

  namespace kakao.maps {
    export class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    export class Map {
      constructor(
        container: HTMLElement,
        options: { center: LatLng; level: number }
      );
    }

    export class Marker {
      constructor(options: {
        position: LatLng;
        map: Map;
        image: kakao.maps.MarkerImage;
        clickable: boolean;
      });
      setMap(map: map | null): void;
    }

    export class Size {
      constructor(width: number, height: number);
      width: number;
      height: number;
    }

    export class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
    }

    export class MarkerImage {
      constructor(
        imageSrc: string,
        imageSize: Size,
        imageOption?: { offset: Point }
      );
    }

    export class InfoWindow {
      constructor(options: { content: string });
      open(map: Map, marker: Marker): void;
    }
    export namespace event {
      export function addListener(
        target: any,
        type: string,
        callback: (...args: any[]) => void
      ): void;
    }
  }
}

export {};
