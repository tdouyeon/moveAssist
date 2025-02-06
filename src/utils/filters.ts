export const filteredRegions = (regions: string[], selectedRegion: string) => {
  const filteredRegions = regions.filter((region) => {
    // 지역명이 선택된 지역을 포함하고 있고, 공백이 있는 경우(시나 군이 포함된 경우)
    return region.includes(selectedRegion) && region.split(' ').length > 1;
  });

  const splitRegions = filteredRegions.map((region) => region.split(' ')[1]);
  return [...new Set(splitRegions)];
};
