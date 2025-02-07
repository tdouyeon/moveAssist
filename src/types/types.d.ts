declare global {
  interface Coordinates {
    lat: number;
    lng: number;
  }

  interface Window {
    kakao: typeof kakao;
  }

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
  }
}

export {};
