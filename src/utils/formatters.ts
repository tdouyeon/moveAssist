// 객체가 들어가있는 배열에서 객체마다 원하는 키-값만 뽑아내는 함수
export const dataFormatterObject = (data: [], filter: string[]) => {
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

export const dataFormatterArray = (data: [], filter: string[]) => {
  return data.map((item) => filter.map((key) => item[key])).flat(); // 2차원 배열을 1차원 배열로 평평하게 만듦
};
